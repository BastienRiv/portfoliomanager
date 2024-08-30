async function loadTable(type) {
  try {
    const response = await fetch(
      `http://localhost:4001/api/transaction/${type}/`
    );
    const transactions = await response.json();

    const tableBody = document.querySelector(`#${type}-table tbody`);
    tableBody.innerHTML = ""; // Clear any existing rows

    transactions.forEach((transaction) => {
      const row = document.createElement("tr");

      const idCell = document.createElement("td");
      idCell.textContent =
        type === "buy"
          ? transaction.id_transactionb
          : transaction.id_transactions;
      row.appendChild(idCell);

      const dateCell = document.createElement("td");
      dateCell.textContent = new Date(
        type === "buy" ? transaction.bdate : transaction.sdate
      ).toLocaleDateString();
      row.appendChild(dateCell);

      const stocksCell = document.createElement("td");
      stocksCell.textContent =
        type === "buy" ? transaction.stocks_bought : transaction.stocks_sold;
      row.appendChild(stocksCell);

      const costCell = document.createElement("td");
      costCell.textContent =
        type === "buy"
          ? transaction.cost.toFixed(3)
          : transaction.adj_cost.toFixed(3);
      row.appendChild(costCell);

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading transactions:", error);
  }
}

async function loadInvestmentTable() {
  try {
    const response = await fetch("http://localhost:4001/api/currentStocks");
    const investments = await response.json();

    const tableBody = document.querySelector("#investment-table tbody");
    tableBody.innerHTML = ""; // Clear any existing rows

    investments.forEach((investment) => {
      const row = document.createElement("tr");

      const companyCell = document.createElement("td");
      companyCell.textContent = investment.Company;
      row.appendChild(companyCell);

      const quantityCell = document.createElement("td");
      quantityCell.textContent = investment.Quantity;
      row.appendChild(quantityCell);

      const costCell = document.createElement("td");
      costCell.textContent = investment.Total_Cost.toFixed(3);
      row.appendChild(costCell);

      const valueCell = document.createElement("td");
      valueCell.textContent = investment.Total_Value.toFixed(3);
      row.appendChild(valueCell);

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading investment data:", error);
  }
}

// Load data for all tables
function populateAllTables() {
  loadTable("buy"); // For Purchase Tracking
  loadTable("sell"); // For Sales Tracking
  loadInvestmentTable(); // For Investment Tracking
  loadNavigatingBarSellBuy();
}

// Run the function when the page loads
document.addEventListener("DOMContentLoaded", populateAllTables);

function loadNavigatingBarSellBuy() {
  fetch("/nav-bar.html")
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      // Inject the HTML into the DOM
      document.getElementById("nav-bar-bs").innerHTML = data;
    })
    .catch((error) => console.error("Error loading the content:", error));
}
