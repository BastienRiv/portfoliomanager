'use strict';

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { executeQuery } from './database-setup.js';
import performanceRouter from './routes/performance.route.js';
import { financePageRouter } from './routes/finance-page.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express App
const app = express();
app.use(express.json());
app.use(cors());

// Middleware
app.use((req, res, next) => {
    console.info('--- Incoming Request --- ' + 'Time: ' + Date.now());
    console.info('Method: ' + req.method + ' | URL: ' + req.originalUrl);
    console.info('Headers:', JSON.stringify(req.headers, null, 2));
    console.info('Body:', JSON.stringify(req.body, null, 2));
    console.info('Query Params:', JSON.stringify(req.query, null, 2));
    console.info('------------------------');
    next();
});

app.use('/api/performance', performanceRouter);

app.get('/finance', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'finance.html'));
});

app.use('/api/finance/', financePageRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/homepage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

app.get('/portfolio', (req, res) => {
    res.sendFile(path.join(__filename, '../public/portfolio.html'));
});

app.get('/purchase', (req, res) => {
    res.sendFile(path.join(__filename, '../public/pages/purchase/purchase.html'));
});

app.get('/sale', (req, res) => {
    res.sendFile(path.join(__filename, '../public/sale.html'));
});

app.get('/api', (req, res) => {
    res.send('This API is live!');
});

app.get('/api/user', (req, res) => {
    const query = `SELECT * from user;`;
    executeQuery(query, [], res)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed' });
        });
});

app.get('/api/companies', (req, res) => {
    const query = `SELECT id_company, cname from company;`;
    executeQuery(query, [], res)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed' });
        });
});

app.get('/api/stockprice', (req, res) => {
    const { id_company, sdate } = req.query;

    const query = `select adj_close from stocks where id_company= ? and sdate = ?;`;

    executeQuery(query, [id_company, sdate], res)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed' });
        });
});

app.get('/api/dashboard', async (req, res) => {
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

        const results = await executeQuery(query, params, res);

        const jobCounts = {};
        results.forEach((employee) => {
            const jobDesc = employee.job_desc;
            jobCounts[jobDesc] = (jobCounts[jobDesc] || 0) + 1;
        });

        res.json({ jobCounts });
    } catch (error) {
        res.status(500).json({ error: 'Database query error' });
    }
});

app.get('/api/profit', (req, res) => {
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

    executeQuery(query, [], res)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to add Purchase' });
        });
});

// Gets ALL buy transactions from company
app.get('/api/transactions/:type/:id_company', (req, res) => {
    const idCompany = req.params.id_company;
    const type = req.params.type; // type = 'sell' || 'buy'

    if (!idCompany) {
        return res.status(400).json({ error: 'id_company route parameter is required: .../:id_company' });
    }

    const query = `SELECT * FROM ${type} WHERE id_company = ?`;
    executeQuery(query, [idCompany], res)
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to retrieve purchases' });
        });
});

app.post('/api/purchase', function (req, res) {
    const { id_transactionb, bdate, stocks_bought, cost, tot_investment, id, id_company, id_stock } = req.body;

    const query = `INSERT INTO buy (id_transactionb, bdate, stocks_bought, cost, tot_investment, id, id_company, id_stock) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

    executeQuery(query, [id_transactionb, bdate, stocks_bought, cost, tot_investment, id, id_company, id_stock], res)
        .then(() => {
            res.status(200).json({ message: 'Purchase added successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to add Purchase' });
        });
});

app.post('/api/sale', function (req, res) {
    const { id_transactions, sdate, stocks_sold, adj_cost, tot_sold, id, id_company, id_stock } = req.body;

    const query = `INSERT INTO sell (id_transactions, sdate, stocks_sold, adj_cost, tot_sold, id, id_company, id_stock) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

    executeQuery(query, [id_transactions, sdate, stocks_sold, adj_cost, tot_sold, id, id_company, id_stock], res)
        .then(() => {
            res.status(200).json({ message: 'Sale added successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to add Sale' });
        });
});

// Catch-all route for any other requests
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

const port = 4001;
app.listen(port, () => {
    console.info(`Server running at http://localhost:${port}/`);
});
