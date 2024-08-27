import express from 'express';
import { executeQuery } from '../database-setup.js'

const performanceRouter = express.Router();

performanceRouter.get('/', async (req, res) => {
  console.log("PASOU!")
    try {
      const { id_company } = req.query;
  
      // Obtener la lista de empresas
      const companies = await executeQuery('SELECT DISTINCT id_company FROM portfolio.stocks', [], res);
      
      // Obtener los datos para el gráfico de línea
      let query = `SELECT sdate, adj_close FROM stocks WHERE id_company = ?`;
      const lineChartResults = await executeQuery(query, [id_company], res);
      const lineChartLabels = lineChartResults.map((row) => row.sdate);
      const lineChartData = lineChartResults.map((row) => row.adj_close);
  
      query = queryForCircleCharts();
      const circleChartResults = await executeQuery(query, [id_company], res);
console.log(circleChartResults)

      const profitLoss = circleChartResults[0].PL;
  
      res.send({
        id_company,
        companies,
        lineChartLabels,
        lineChartData,
        profitLoss
      });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Database query error' });
    }
  });

function queryForCircleCharts() {
    return `
    WITH bu AS (
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

 
export default performanceRouter;