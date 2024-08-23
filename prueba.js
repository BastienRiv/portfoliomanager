import mysql from 'mysql2/promise';
import express from 'express';
//import { Chart } from 'chart.js/auto';
import Chart from 'chart.js/auto';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'c0nygre',
  database: 'pubs',
  port: 3306
});

const app = express();

// Middleware para manejar las rutas
const dashboardRouter = express.Router();

// Ruta para obtener el dashboard
dashboardRouter.get('/', async (req, res) => {
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

    const [results] = await connection.query(query, params);

    // Contar la cantidad de IDs por cada trabajo
    const jobCounts = {};
    results.forEach((employee) => {
      const jobDesc = employee.job_desc;
      if (jobCounts[jobDesc]) {
        jobCounts[jobDesc]++;
      } else {
        jobCounts[jobDesc] = 1;
      }
    });

    // Crear el HTML del dashboard
    let html = `
      <h1>Dashboard</h1>
      <canvas id="myChart"></canvas>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <script>
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ${JSON.stringify(Object.keys(jobCounts))},
            datasets: [{
              label: 'Cantidad de IDs',
              data: ${JSON.stringify(Object.values(jobCounts))},
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      </script>
    `;

    res.send(html);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database query error' });
  }
});

// Usar el router en la aplicación
app.use('/dashboard', dashboardRouter);

// Catch-all route to handle any other requests
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(3001, () => {
  console.log('Server running at http://localhost:3001/');
});