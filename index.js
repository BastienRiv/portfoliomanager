const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'c0nygre',
  database: 'portfolio'
});

app.get('/', (req, res) => {
  connection.query('SELECT * FROM user', (error, results, fields) => {
    if (error) throw error;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>User Data</title>
        </head>
        <body>
          <h1>User Data</h1>
          <table>
            <tr>
              <th>Name</th>
            </tr>
            ${results.map(user => `
              <tr>
                <td>${user.fname}</td>
              </tr>
            `).join('')}
          </table>
        </body>
      </html>
    `;

    res.send(html);
  });
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});