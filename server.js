'use strict';

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { executeQuery } from './database-setup.js';
import performanceRouter from './routes/performance.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express App
const app = express();
app.use(express.json());
app.use(cors());

// Middleware
app.use((req, res, next) => {
    console.log('--- Incoming Request --- ' + 'Time: ' + Date.now());
    console.log('Method: ' + req.method + ' | URL: ' + req.originalUrl);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Body:', JSON.stringify(req.body, null, 2));
    console.log('Query Params:', JSON.stringify(req.query, null, 2));
    console.log('------------------------');
    next();
});

//app.use('/api/performance', performanceRouter);

app.get('/finance', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Edición de Oscar
// Router para dash
// Usar el router en la aplicación
app.use('/finance', performanceRouter);



//app.use(express.static(path.join(__dirname, 'public')));



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


app.get('/api/profit', (req, res) => {
    const query = `
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

    executeQuery(query, [], res)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to add Purchase' });
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
    console.log(`Server running at http://localhost:${port}/`);
});

