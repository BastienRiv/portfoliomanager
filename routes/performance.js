import express from 'express';
import mysql from 'mysql2/promise';

// Crear un pool de conexiones en lugar de una sola conexión
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'c0nygre',
  database: 'portfolio',
  port: 3306,
  connectionLimit: 10 // ajustar según sea necesario
});

const performanceRouter = express.Router();

performanceRouter.get('/', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { id_company } = req.query;

  
    // Obtener la lista de empresas
    const [companies] = await connection.query('SELECT DISTINCT id_company FROM portfolio.stocks');

    // Obtener los datos para el gráfico de línea
    let query = `
      SELECT sdate, adj_close
      FROM stocks
      WHERE id_company = ?
    `;
    const [lineChartResults] = await connection.query(query, [id_company]);
    const lineChartLabels = lineChartResults.map(row => row.sdate);
    const lineChartData = lineChartResults.map(row => row.adj_close);

    // Obtener los datos para el gráfico de círculo de Profit/Loss
    query = `
      WITH cte AS (
        SELECT id_company, MAX(cost) AS max_cost 
        FROM portfolio.buy 
        GROUP BY id_company
      ), 
      cte2 AS (
        SELECT id_company, tot_sold, stocks_sold 
        FROM sell
      ), 
      cte3 AS (
        SELECT 
          cte.id_company,
          cte.max_cost * cte2.stocks_sold AS tot_cost,
          cte2.tot_sold 
        FROM cte 
        JOIN cte2 ON cte.id_company = cte2.id_company
      ) 
      SELECT 
        cte3.id_company, 
        cte3.tot_sold, 
        cte3.tot_cost, 
        ((cte3.tot_sold - cte3.tot_cost) / cte3.tot_sold) * 100 AS pl 
      FROM cte3 
      WHERE cte3.id_company = ?
    `;
    const [circleChartResults] = await connection.query(query, [id_company]);
    const profitLossPercentage = circleChartResults[0]?.pl || 0;

    // Obtener los datos para el segundo gráfico de círculo basado en la predicción
    query = `
      WITH cte AS (
        SELECT id_company, MAX(cost) AS max_cost
        FROM portfolio.buy
        GROUP BY id_company
      )
      SELECT 
        prediction.id_company, 
        prediction.pcost, 
        cte.max_cost, 
        ((prediction.pcost - cte.max_cost) / prediction.pcost) * 100 AS PL_p 
      FROM prediction 
      JOIN cte ON prediction.id_company = cte.id_company
      WHERE prediction.id_company = ?
    `;
    const [predictionChartResults] = await connection.query(query, [id_company]);
    const plPercentage = predictionChartResults[0]?.PL_p || 0;

    // Obtener datos para la tabla de stocks
    query = `
      WITH Cte AS (
        SELECT id_company, SUM(stocks_bought) AS compra
        FROM portfolio.buy
        GROUP BY id_company
      ),
      Cte2 AS (
        SELECT id_company, adj_cost, SUM(stocks_sold) AS venta
        FROM portfolio.sell
        GROUP BY id_company
      ),
      Cte3 AS (
        SELECT 
          Cte.id_company, 
          Cte2.adj_cost, 
          Cte.compra - Cte2.venta AS Stock, 
          (Cte.compra - Cte2.venta) * Cte2.adj_cost AS money_stock 
        FROM Cte 
        JOIN Cte2 ON Cte.id_company = Cte2.id_company
      )
      SELECT * FROM Cte3
    `;
    const [tableData] = await connection.query(query);

    res.json({
      companies: companies.map(c => ({ id_company: c.id_company })),
      lineChartLabels,
      lineChartData,
      profitLossPercentage,
      plPercentage,
      tableData
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    connection.release(); // Asegúrate de liberar la conexión
  }
});

export default performanceRouter;