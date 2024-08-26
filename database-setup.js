import mysql from 'mysql2/promise';
import dotenv from 'dotenv'

dotenv.config();

// Database Connection
let connection;

async function connectDatabase() {
    try{
        connection = await mysql.createConnection({
            host: process.env.host,
            user: process.env.user,
            password: process.env.password,
            database: process.env.database,
            port: process.env.port
        });
        console.log('Connected to the database');
    } catch (err) {
        console.error('Error connecting to the database', err.stack);
    }
}

await connectDatabase(); 

  
export async function executeQuery(query, params, res) {
    if (!connection) {
        return res.status(500).send('Database connection not established.');
    }
    try {
        const [results] = await connection.query(query,params);
        return results;
    } catch (error) {
        console.error('Database querry error: ', error);
        return results;
    }
}