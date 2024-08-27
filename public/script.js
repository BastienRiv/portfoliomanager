document.addEventListener('DOMContentLoaded', async () => {
    initialChart();
    loadPerformancePage();
});

async function initialChart() {
    try {
        const response = await fetch('http://localhost:4001/api/dashboard');
        const data = await response.json();
    
        const jobCounts = data.jobCounts;
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: Object.keys(jobCounts),
            datasets: [{
              label: 'Cantidad de IDs',
              data: Object.values(jobCounts),
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
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
}

// TODO: Make this into a function to recall  
function loadPerformancePage() {
    fetch('/pages/performance.html')
        .then(response => response.text())
        .then(data => {
            // Inject the HTML into the DOM
            document.getElementById('performance-page').innerHTML = data;

            // Manually load and execute the performance.js script
            const script = document.createElement('script');
            script.src = './pages/performance.js';
            document.body.appendChild(script);
        })
        .catch(error => console.error('Error loading the content:', error));
}
