import mysql from 'mysql2';
import dotenv from 'dotenv'
dotenv.config();

//const mysql = require('mysql2');
//require('dotenv').config()
//console.log(process.env) // remove this after you've confirmed it is working

// Database Connection

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port
});
  
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database');
});

// function executeQuery(query, params, res) {
//     connection.query(query, params, (error, results, fields) => {
//         if (error) {
//             console.error('Database query error:', error);
//             res.status(500).send('Database query error\n');
//             return;
//         }

//         res.status(200).json(results);
//     });
// }

// module.exports={
//     executeQuery
// }
  
export function executeQuery(query, params, res) {
    connection.query(query, params, (error, results, fields) => {
        if (error) {
            console.error('Database query error:', error);
            res.status(500).send('Database query error\n');
            return;
        }

        res.status(200).json(results);
    });
}