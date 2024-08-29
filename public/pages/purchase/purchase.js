const pagePurchase = {
  companiesList: [],
};

// Call the function to load data on page load
document.addEventListener("DOMContentLoaded", () => {
  handleTabs();

  manageSalesForm();
  manageBuyForm();

  loadCompanyList();
  loadTable("buy");
  loadTable("sell");
});

function handleTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  function activateTab(tabId) {
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => (content.style.display = "none"));

    const activeTabContent = document.getElementById(tabId);
    const activeTabButton = document.querySelector(
      `.tab-button[data-tab="${tabId}"]`
    );

    if (activeTabContent && activeTabButton) {
      activeTabContent.style.display = "block";
      activeTabButton.classList.add("active");
    }
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");
      activateTab(tabId);
    });
  });

  // Check for a hash in the URL when the page loads
  const hash = window.location.hash.substring(1); // Remove the '#' from the hash
  if (hash) {
    activateTab(hash);
  } else {
    // If no hash, activate the first tab by default
    const firstTab = tabButtons[0].getAttribute("data-tab");
    activateTab(firstTab);
  }
}

// API connections

async function loadCompanyList() {
  return getCompanies()
    .then((data) => {
      pagePurchase.companiesList = data;
      populateCompaniesList(pagePurchase);
    })
    .catch((error) => console.error("Error loading the content:", error));

  function populateCompaniesList(pagePurchase) {
    const companiesListElement = document.getElementById("companies-list");
    companiesListElement.innerHTML = "";

    pagePurchase.companiesList.forEach((company) => {
      const listItem = document.createElement("li");
      listItem.textContent = `(${company.id_company}) ${company.cname}`;
      listItem.addEventListener("click", () => {
        // Update the readonly fields in the forms
        document.getElementById("company-name-purchase").value = company.cname;
        document.getElementById("company-name-sale").value = company.cname;

        // Load tables for the selected company
        loadTable("buy", company.id_company);
        loadTable("sell", company.id_company);

        // Store the selected company's ID in a hidden field or variable
        document.querySelector("#company-select-purchase").value =
          company.id_company;
        document.querySelector("#company-select-sale").value =
          company.id_company;
      });
      companiesListElement.appendChild(listItem);
      companiesListElement.appendChild(listItem);
    });
  }
}

async function loadTable(type, id_company = "") {
  try {
    const response = await fetch(
      "http://localhost:4001/api/transactions/" + type + "/" + id_company
    );
    const transactions = await response.json();

    const tableBody = document.querySelector(`#${type}-table tbody`);
    tableBody.innerHTML = ""; // Clear any existing rows

    if (type === "buy") {
      transactions.forEach((transaction) => {
        const row = document.createElement("tr");

        // Create and append cells
        const idCell = document.createElement("td");
        idCell.textContent = transaction.id_transactionb;
        row.appendChild(idCell);

        const dateCell = document.createElement("td");
        dateCell.textContent = new Date(transaction.bdate).toLocaleDateString();
        row.appendChild(dateCell);

        const stocksCell = document.createElement("td");
        stocksCell.textContent = transaction.stocks_bought;
        row.appendChild(stocksCell);

        const costCell = document.createElement("td");
        costCell.textContent = transaction.cost.toFixed(2);
        row.appendChild(costCell);

        tableBody.appendChild(row);
      });
    } else {
      transactions.forEach((transaction) => {
        const row = document.createElement("tr");

        // Create and append cells
        const idCell = document.createElement("td");
        idCell.textContent = transaction.id_transactions;
        row.appendChild(idCell);

        const dateCell = document.createElement("td");
        dateCell.textContent = new Date(transaction.sdate).toLocaleDateString();
        row.appendChild(dateCell);

        const stocksCell = document.createElement("td");
        stocksCell.textContent = transaction.stocks_sold;
        row.appendChild(stocksCell);

        const costCell = document.createElement("td");
        costCell.textContent = transaction.adj_cost.toFixed(2);
        row.appendChild(costCell);

        tableBody.appendChild(row);
      });
    }
  } catch (error) {
    console.error("Error loading transactions:", error);
  }
}

function manageBuyForm() {
  getCompanies()
    .then((companies) => {
      const selectElement = document.querySelector("#company-select-purchase");
      companies.forEach((company) => {
        const option = document.createElement("option");
        option.value = company.id_company;
        option.textContent = company.cname;
        selectElement.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching companies:", error));

  // Set the date input field to today's date
  const today = new Date().toISOString().split("T")[0];
  document.querySelector("#bdate").value = today;

  // Fetch stock price when company or date changes
  document
    .querySelector("#company-select-purchase")
    .addEventListener("change", fetchStockPrice);
  document.querySelector("#bdate").addEventListener("change", fetchStockPrice);

  function fetchStockPrice() {
    const company = document.querySelector("#company-select-purchase").value;
    const date = document.querySelector("#bdate").value;

    if (company && date) {
      console.info(
        "Fetching stock price for company:",
        company,
        "and date:",
        date
      );
      fetch(`/api/stockprice?id_company=${company}&sdate=${date}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          console.info("Data received from API:", data);
          if (data && data.length > 0 && data[0].adj_close) {
            document.querySelector("#cost").value =
              data[0].adj_close.toFixed(3);
          } else {
            document.querySelector("#cost").value = ""; // Clear if no price found
          }
        })
        .catch((error) => console.error("Error fetching stock price:", error));
    }
  }

  const form = document.querySelector("#purchase-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    const bdate = formData.get("bdate");
    const stocksBought = formData.get("stocks_bought");
    const cost = formData.get("cost");
    const totalInvestment = (stocksBought * cost).toFixed(3);
    const user = 1;
    const company = formData.get("companies");
    const stockId = bdate + company;
    const idTransaction = stocksBought + stockId + user;

    // Constructing the data object with variables
    const purchaseData = {
      id_transactionb: idTransaction,
      bdate: bdate,
      stocks_bought: stocksBought,
      cost: cost,
      tot_investment: totalInvestment,
      id: user,
      id_company: company,
      id_stock: null,
    };

    fetch("/api/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purchaseData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then(() => {
        // Refresh the tables after successful purchase
        loadTable("buy", company);
        loadTable("sell", company);
      })
      .catch((error) => console.error("Error during purchase:", error));
  });
}

async function getCompanies() {
  return fetch("/api/companies")
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching companies:", error));
}

function manageSalesForm() {
  getCompanies().then((companies) => {
    const selectElement = document.querySelector("#company-select-sale");
    companies.forEach((company) => {
      const option = document.createElement("option");
      option.value = company.id_company;
      option.textContent = company.cname;
      selectElement.appendChild(option);
    });
  });

  // Set the date input field to today's date
  const today = new Date().toISOString().split("T")[0];
  document.querySelector("#sdate").value = today;

  // Fetch stock price when company or date changes
  document
    .querySelector("#company-select-sale")
    .addEventListener("change", fetchStockPriceSale);
  document
    .querySelector("#sdate")
    .addEventListener("change", fetchStockPriceSale);

  function fetchStockPriceSale() {
    const company = document.querySelector("#company-select-sale").value;
    const date = document.querySelector("#sdate").value;

    if (company && date) {
      console.info(
        "Fetching stock price for company:",
        company,
        "and date:",
        date
      );
      fetch(`/api/stockprice?id_company=${company}&sdate=${date}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          console.info("Data received from API:", data);
          if (data && data.length > 0 && data[0].adj_close) {
            document.querySelector("#adj_cost").value =
              data[0].adj_close.toFixed(3);
          } else {
            document.querySelector("#adj_cost").value = ""; // Clear if no price found
          }
        })
        .catch((error) => console.error("Error fetching stock price:", error));
    }
  }

  const formSale = document.querySelector("#sale-form");

  formSale.addEventListener("submit", function (event) {
    event.preventDefault();

    const formSaleData = new FormData(formSale);

    const sdate = formSaleData.get("sdate");
    const stocksSold = formSaleData.get("stocks_sold");
    const adj_cost = formSaleData.get("adj_cost");
    const totalSold = (stocksSold * adj_cost).toFixed(3);
    const user = 1;
    const company = formSaleData.get("companies");
    const stockId = sdate + company;
    const idTransaction = stocksSold + stockId + user;

    // Constructing the data object with variables
    const soldData = {
      id_transactions: idTransaction,
      sdate: sdate,
      stocks_sold: stocksSold,
      adj_cost: adj_cost,
      tot_sold: totalSold,
      id: user,
      id_company: company,
      id_stock: null,
    };

    fetch("/api/sale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(soldData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then(() => {
        // Refresh the tables after successful purchase
        loadTable("buy", company);
        loadTable("sell", company);
      })
      .catch((error) => console.error("Error during purchase:", error));
  });
}
