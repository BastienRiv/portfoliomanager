"use strict"

import express from 'express'
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { executeQuery, executeQueryDashboard } from './database-setup.js'
import performanceRouter from './routes/performance.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express App
const app = express();
app.use(express.json());
app.use(cors());

// // Middleware
// app.use((req, res, next) => {
//   console.log('--- Incoming Request --- ' + "Time: " + Date.now());
//   console.log('Method: ' + req.method + ' | URL: ' + req.originalUrl);
//   console.log('Headers:', JSON.stringify(req.headers, null, 2));
//   console.log('Body:', JSON.stringify(req.body, null, 2));
//   console.log('Query Params:', JSON.stringify(req.query, null, 2));
//   console.log('------------------------');
//   next();
// });

app.use('/api/performance', performanceRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api', (req, res) => {
  res.send('This API is live!');
});


app.get('/user', (req, res) => {
  const query = `SELECT * from user;`;
  executeQuery(query,[],res);
});


app.get('/dashboard', async (req,res) => {
  try {
    const { city, state } = req.query;
    let query = `
      SELECT emp.emp_id, job.job_desc
      FROM pubs.employee AS emp
      JOIN pubs.jobs AS job ON emp.job_id = job.job_id
    `;

    const params = [];
    if (city && state) {
      query += `WHERE emp.city = ? AND emp.state = ?`;
      params.push(city, state);
    }

    const results = await executeQueryDashboard(query, params, res);

    const jobCounts = {};
    results.forEach((employee) => {
      const jobDesc = employee.job_desc;
      jobCounts[jobDesc] = (jobCounts[jobDesc] || 0) + 1;
    });

    res.json({ jobCounts });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database query error' });
  }
});

app.get('/profit', (req, res) => {
  const query = `
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
                bu ON sel.id_company = bu.id_company)
            Select id_company, (tot_investment - tot_sold) as PL FROM principal   
  `;
  executeQuery(query,[],res);
});

// Catch-all route for any other requests
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const port = 4001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});