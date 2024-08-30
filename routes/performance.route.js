import express from 'express';
import { executeQuery } from '../database-setup.js';

const performanceRouter = express.Router();

performanceRouter.get('/', async (req, res) => {
    try {
        const { id_company } = req.query;

        // Obtener la lista de empresas
        const companies = await executeQuery('SELECT DISTINCT id_company FROM portfolio.stocks', [], res);

        // Obtener los datos para el gráfico de línea
        let query = `SELECT sdate, adj_close FROM stocks WHERE id_company = ?`;
        const lineChartResults = await executeQuery(query, [id_company], res);
        const lineChartLabels = lineChartResults.map((row) => row.sdate);
        const lineChartData = lineChartResults.map((row) => row.adj_close);

        // One chart
        const circleChartResults = await executeQuery(queryForCircleCharts(), [id_company], res);
        const profitLossPercentage = circleChartResults[0]?.pl || 0;
        const profitLoss = circleChartResults[0].PL;

        // Second chart
        const [predictionChartResults] = await executeQuery(queryForPredictionChart(), [id_company]);
        const plPercentage = predictionChartResults[0]?.PL_p || 0;

        const [tableData] = await executeQuery(queryForStockTable());

        res.send({
            id_company,
            companies,
            lineChartLabels,
            lineChartData,
            profitLossPercentage,
            profitLoss,
            plPercentage,
            tableData,
        });
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'Database query error' });
    }
});

// function queryForCircleCharts() {
//     return `
//   WITH cte AS (
//     SELECT id_company, MAX(cost) AS max_cost
//     FROM portfolio.buy
//     GROUP BY id_company
//   ),
//   cte2 AS (
//     SELECT id_company, tot_sold, stocks_sold
//     FROM sell
//   ),
//   cte3 AS (
//     SELECT
//       cte.id_company,
//       cte.max_cost * cte2.stocks_sold AS tot_cost,
//       cte2.tot_sold
//     FROM cte
//     JOIN cte2 ON cte.id_company = cte2.id_company
//   )
//   SELECT
//     cte3.id_company,
//     cte3.tot_sold,
//     cte3.tot_cost,
//     ((cte3.tot_sold - cte3.tot_cost) / cte3.tot_sold) * 100 AS pl
//   FROM cte3
//   WHERE cte3.id_company = ?
// `;
// }

function queryForCircleCharts() {
    return `WITH bu AS (
    SELECT id_company, SUM(tot_investment) AS tot_investment
    FROM portfolio.buy
    GROUP BY id_company
  ),
  sel AS (
    SELECT id_company, SUM(tot_sold) AS tot_sold
    FROM portfolio.sell
    GROUP BY id_company
  ),
  principal AS (
    SELECT
      COALESCE(bu.id_company, sel.id_company) AS id_company,
      COALESCE(bu.tot_investment, 0) AS tot_investment,
      COALESCE(sel.tot_sold, 0) AS tot_sold
    FROM
      bu
    LEFT JOIN
      sel ON bu.id_company = sel.id_company
    UNION ALL
    SELECT
      COALESCE(bu.id_company, sel.id_company) AS id_company,
      COALESCE(bu.tot_investment, 0) AS tot_investment,
      COALESCE(sel.tot_sold, 0) AS tot_sold
    FROM
      sel
    LEFT JOIN
      bu ON sel.id_company = bu.id_company
  )
  SELECT id_company, (tot_investment - tot_sold) as PL
  FROM principal
  WHERE id_company = ?`;
}

function queryForPredictionChart() {
    return `
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
}

function queryForStockTable() {
    return `WITH Cte AS (
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
}

export default performanceRouter;
