"use strcit"

//const express = require('express');
//const {executeQuery} = require('./database-setup.js')
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

import express from 'express'
import { executeQuery } from './database-setup.js'

// Express App
const app = express();
app.use(express.json());


// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

app.get('/company', (req, res) => {
  const query = `SELECT * from company;`;

  executeQuery(query, [] , res);
})

app.get('/stocks', (req, res) => {
  const query = `SELECT * from stocks;`;

  executeQuery(query, [] , res);
})

app.get('/buy', (req, res) => {
  const query = `SELECT * from buy;`;

  executeQuery(query, [] , res);
})

app.get('/sell', (req, res) => {
  const query = `SELECT * from sell;`;

  executeQuery(query, [] , res);
})


const port = 4000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});