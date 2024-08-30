let performancePageData = {};
let lineChart = null;
let profitLossChart = null;

function changeCompany(id_company) {
  loadData(id_company); // Fetch and update charts with the new company data
}

function setupNavbar(data) {
  const { companies } = data;
  // Populate company list
  const companiesList = companies
    .map(
      (company) => `
        <li class="nav-item">
            <a class="nav-link" href="javascript:void(0);" onclick="changeCompany('${company.id_company}')">${company.id_company}</a>
        </li>
    `
    )
    .join("");

  // document.getElementById('companies-list').innerHTML = companiesList;
  document.getElementById("companies").innerHTML = companiesList;
}

function updateChart() {
  const { id_company, lineChartLabels, lineChartData, profitLoss, tableData } =
    performancePageData;

  document.getElementById("company-id").innerHTML = `Company ID: ${id_company}`;
  document.getElementById(
    "latest-adjusted-close"
  ).innerHTML = `Latest Adjusted Close: ${
    lineChartData[lineChartData.length - 1]
  }`;

  // Destroy existing line chart if it exists
  if (lineChart) {
    lineChart.destroy();
  }

  // Create new line chart
  const lineCtx = document.getElementById("lineChart").getContext("2d");
  lineChart = new Chart(lineCtx, {
    type: "line",
    data: {
      labels: lineChartLabels,
      datasets: [
        {
          label: "Adjusted Close",
          data: lineChartData,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });

  // Destroy existing doughnut chart if it exists
  if (profitLossChart) {
    profitLossChart.destroy();
  }

  // Create new doughnut chart
  const circleCtx = document.getElementById("profitLossChart").getContext("2d");
  profitLossChart = new Chart(circleCtx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [profitLoss, 0],
          backgroundColor: ["#231F20", "#CCCCCC"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: profitLoss.toFixed(2),
        },
      },
    },
  });

  // Create Table

  const tableElement = `
        <tr>
            <td>${tableData.id_company}</td>
            <td>${parseFloat(tableData.adj_cost).toFixed(2)}</td>
            <td>${parseFloat(tableData.Stock).toFixed(2)}</td>
            <td>${parseFloat(tableData.money_stock).toFixed(2)}</td>
        </tr>
        `;
  document.getElementById("table-body-tbody").innerHTML = tableElement;
}

async function loadData(id_company = "AMZN") {
  return fetch(`http://localhost:4001/api/performance?id_company=${id_company}`)
    .then((response) => response.json())
    .then((data) => {
      console.log({ data });
      performancePageData = data;
      performancePageData.id_company = id_company; // Ensure the company ID is set
      setupNavbar(data);
      updateChart();
    })
    .catch((error) => console.error("Error loading the content:", error));
}

// Initial load with default company
loadData();
