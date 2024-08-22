"use strcit"

const express = require('express');
const {executeQuery} = require('./database-setup.js')

// import express from 'express'
// import { executeQuery } from './database-setup.js'

// Express App
const app = express();
app.use(express.json());

// --- Middleware

app.use((req, res, next) => {
  console.log('--- Incoming Request --- ' + "Time: " + Date.now());
  console.log('Method: ' + req.method + ' | URL: ' + req.originalUrl);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('Query Params:', JSON.stringify(req.query, null, 2));
  console.log('------------------------');
  next();
});

app.get('/', (req, res) => {
  res.send('This API is live!')
})

app.get('/user', (req, res) => {
  const query = `SELECT * from user;`;

  executeQuery(query,[],res);
  
});

app.get('/companies', (req, res) => {
  const query = `SELECT * from companies;`

  connection.query(query, (error, results, fields) => {
    if (error) {
        console.error('Database query error:', error);
        res.status(500).send('Database query error\n');
        return;
    }

    res.status(200).json(results);
  });
})


const port = 4000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});