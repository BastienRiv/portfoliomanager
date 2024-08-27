import mysql from 'mysql2/promise';
import express from 'express';
import { Chart } from 'chart.js/auto';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'spyro123',
  database: 'portfolio',
  port: 3306
});

const app = express();

// Middleware para manejar las rutas
const financePageRouter = express.Router();

// Ruta para obtener la página de finanzas
financePageRouter.get('/', async (req, res) => {
  try {
    const { id_company } = req.query;

    // Obtener la lista de empresas
    const [companies] = await connection.query('SELECT DISTINCT id_company FROM portfolio.stocks');

    // Obtener los datos para el gráfico de línea
    let query = `
      SELECT sdate, adj_close
      FROM stocks
      WHERE id_company = ?
    `;
    const [lineChartResults] = await connection.query(query, [id_company]);
    console.log(lineChartResults)

    const lineChartLabels = lineChartResults.map((row) => row.sdate);
    const lineChartData = lineChartResults.map((row) => row.adj_close);

    // Obtener los datos para el gráfico de círculo
    query = `
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
    const [circleChartResults] = await connection.query(query, [id_company]);
    console.log(circleChartResults)
    const profitLoss = circleChartResults[0].PL;

    console.log({
        id_company,
        companies,
        lineChartLabels,
        lineChartData,
        profitLoss
      })

    // Crear el HTML de la página de finanzas
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Finance Page</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
      </head>
      <body>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
          <div class="container">
            <a class="navbar-brand" href="#">Finance Page</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ms-auto">
                ${companies.map((company) => `
                  <li class="nav-item">
                    <a class="nav-link" href="/finance?id_company=${company.id_company}">${company.id_company}</a>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        </nav>

        <div class="container my-5">
          <div class="row">
            <div class="col-md-8">
              <h2 class="mb-4">Stock Chart</h2>
              <canvas id="lineChart"></canvas>
            </div>
            <div class="col-md-4">
              <h2 class="mb-4">Profit/Loss</h2>
              <div class="d-flex justify-content-center">
                <canvas id="profitLossChart" width="200" height="200"></canvas>
              </div>
              <div class="card mt-4">
                <div class="card-body">
                  <h5 class="card-title">Company ID: ${id_company}</h5>
                  <p class="card-text">Latest Adjusted Close: ${lineChartData[lineChartData.length - 1]}</p>
                  <a href="#" class="btn btn-primary">View More</a>
                  <a href="#" class="btn btn-secondary">Download Data</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script>
          // Gráfico de línea
          const lineCtx = document.getElementById('lineChart').getContext('2d');
          const lineChart = new Chart(lineCtx, {
            type: 'line',
            data: {
              labels: ${JSON.stringify(lineChartLabels)},
              datasets: [{
                label: 'Adjusted Close',
                data: ${JSON.stringify(lineChartData)},
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: false
                }
              }
            }
          });

          // Gráfico de círculo
          const circleCtx = document.getElementById('profitLossChart').getContext('2d');
          const profitLossChart = new Chart(circleCtx, {
            type: 'doughnut',
            data: {
              datasets: [{
                data: [${profitLoss}, 0],
                backgroundColor: ['#36A2EB', '#CCCCCC'],
                borderWidth: 0
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: '${profitLoss.toFixed(2)}'
                }
              }
            }
          });
        </script>
      </body>
      <styles>
                    
      </styles>
      </html>
    `;

    res.send(html);
    // res.send({
    //     id_company,
    //     companies,
    //     lineChartLabels,
    //     lineChartData,
    //     profitLoss
    //   });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database query error' });
  }
});

// Usar el router en la aplicación
app.use('/finance', financePageRouter);

// Catch-all route to handle any other requests
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(3002, () => {
  console.log('Server running at http://localhost:3002/');
});