
// import express from 'express';
// import { executeQuery  } from '../database-setup.js';
// const financePageRouter = express.Router();

// financePageRouter.get('/', async (req, res) => {
//   try {
//     const { id_company } = req.query;

//     // Obtener la lista de empresas
//     const companies = await executeQuery('SELECT DISTINCT id_company FROM portfolio.stocks', [],  res);

//     // // Obtener los datos para el gráfico de línea
//     let query = `
//       SELECT sdate, adj_close
//       FROM stocks
//       WHERE id_company = ?
//     `;
//     const lineChartResults = await executeQuery(query, [id_company], res);
//     console.log(lineChartResults)
//     const lineChartLabels = lineChartResults.map((row) => row.sdate);
//     const lineChartData = lineChartResults.map((row) => row.adj_close);

//     // Obtener los datos para el gráfico de círculo
//     query = queryPYL();
//     const circleChartResults = await executeQuery(query, [id_company], res);
//     const profitLoss = circleChartResults[0].PL;

//     // // Crear el HTML de la página de finanzas


//     res.send(JSON.stringify({
//       companies,
//       lineChartLabels,
//       lineChartData,
//       profitLoss
//     }));
//   } catch (error) {
//     console.error('Database query error:', error);
//     res.status(500).json({ error: 'Database query error' });
//   }
// });

// function queryPYL() {
//   return `
//       WITH bu AS (
//         SELECT id_company, SUM(tot_investment) AS tot_investment
//         FROM portfolio.buy
//         GROUP BY id_company
//       ),
//       sel AS (
//         SELECT id_company, SUM(tot_sold) AS tot_sold
//         FROM portfolio.sell
//         GROUP BY id_company
//       ),
//       principal AS (
//         SELECT
//           COALESCE(bu.id_company, sel.id_company) AS id_company,
//           COALESCE(bu.tot_investment, 0) AS tot_investment,
//           COALESCE(sel.tot_sold, 0) AS tot_sold
//         FROM
//           bu
//         LEFT JOIN
//           sel ON bu.id_company = sel.id_company
//         UNION ALL
//         SELECT
//           COALESCE(bu.id_company, sel.id_company) AS id_company,
//           COALESCE(bu.tot_investment, 0) AS tot_investment,
//           COALESCE(sel.tot_sold, 0) AS tot_sold
//         FROM
//           sel
//         LEFT JOIN
//           bu ON sel.id_company = bu.id_company
//       )
//       SELECT id_company, (tot_investment - tot_sold) as PL
//       FROM principal
//       WHERE id_company = ?`;
// }

// export default financePageRouter;

import express from 'express';
import { pool } from '../database-setup.js'; // Asegúrate de que `pool` esté exportado desde este archivo

const financePageRouter = express.Router();

financePageRouter.get('/', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { id_company } = req.query;

    if (!id_company) {
      res.status(400).json({ error: 'id_company query parameter is required' });
      return;
    }

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

    res.send(JSON.stringify({
      companies,
      lineChartLabels,
      lineChartData,
      profitLossPercentage,
      plPercentage,
      tableData
    }));
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database query error' });
  } finally {
    connection.release();
  }
});

export default financePageRouter;