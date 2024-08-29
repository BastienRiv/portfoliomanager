import express from 'express';
import { executeQuery } from '../database-setup.js';
import e from 'express';

// Middleware para manejar las rutas
export const financePageRouter = express.Router();

financePageRouter.get('/', async (req, res) => {
    try {
        const { id_company } = req.query;

        if (!id_company) {
            res.status(400).json({ error: 'id_company query parameter is required' });
            return;
        }

        // Obtener la lista de empresas
        const companies = await executeQuery('SELECT DISTINCT id_company FROM portfolio.stocks');

        // Obtener los datos para el gráfico de línea
        let query = `
      SELECT sdate, adj_close
      FROM stocks
      WHERE id_company = ?
    `;
        const lineChartResults = await executeQuery(query, [id_company]);
        console.log('lineChartResults', lineChartResults);
        const lineChartLabels = lineChartResults.map((row) => row.sdate);
        const lineChartData = lineChartResults.map((row) => row.adj_close);
        console.log('lineChartLabels', lineChartLabels);
        console.log('lineChartData', lineChartData);

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
        const circleChartResults = await executeQuery(query, [id_company]);
        const profitLossPercentage = circleChartResults[0]?.pl || 0;

        console.log('circleChartResults', circleChartResults);
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
    WHERE prediction.id_company = ?`;
        const [predictionChartResults] = await executeQuery(query, [id_company]);
        console.log('predictionChartResults', predictionChartResults);
        const plPercentage = predictionChartResults[0]?.PL_p || 0;

        // Obtener datos para la tabla de stocks
        query = `
        WITH Cte AS (
            SELECT id_company, SUM(stocks_bought) AS compra
            FROM portfolio.buy
            GROUP BY id_company
            ),
            Cte2 AS (
            SELECT id_company, MAX(adj_cost) AS adj_cost, SUM(stocks_sold) AS venta
            FROM portfolio.sell
            GROUP BY id_company
            )
            SELECT 
            Cte.id_company, 
            Cte2.adj_cost, 
            Cte.compra - Cte2.venta AS Stock, 
            (Cte.compra - Cte2.venta) * Cte2.adj_cost AS money_stock 
            FROM Cte 
            JOIN Cte2 ON Cte.id_company = Cte2.id_company;
                `;
        const [tableData] = await executeQuery(query);
        console.log('companies', companies);
        res.status(200).json({
            companies: companies.map((row) => row.id_company),
            lineChart: {
                labels: lineChartLabels,
                data: lineChartData,
            },
            profitLossPercentage,
            plPercentage,
            tableData,
        });
    } catch (error) {
        console.log('fooooo', error);
        res.status(500).json({ error: 'Failed to retrieve data' });
    }
});
