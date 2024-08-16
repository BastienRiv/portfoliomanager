


const http = require('http');
const url = require('url');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'c0nygre',
  database: 'pubs'
});

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  switch (req.method) {
    case 'GET':
      if (parsedUrl.pathname === '/') {
        handleGetRequest(res);
      } else {
        sendResponse(res, 404, 'Not Found');
      }
      break;
    default:
      sendResponse(res, 404, 'Not Found');
  }
});

const port = 4000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

function handleGetRequest(res) {
  connection.query('SELECT * FROM authors', (error, results, fields) => {
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
                <td>${user.au_lname}</td>
              </tr>
            `).join('')}
          </table>
        </body>
      </html>
    `;

    sendResponse(res, 200, html);
  });
}

function sendResponse(res, statusCode, content) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'text/html');
  res.end(content);
}

