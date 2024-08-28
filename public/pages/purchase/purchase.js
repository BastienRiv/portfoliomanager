const pagePurchase = {
    companiesList: [],
};

// Call the function to load data on page load
document.addEventListener('DOMContentLoaded', () => {
    handleTabs();

    loadCompanyList();
    loadBuyTable();
});

// TODO: Move this into a separate function and call above
document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/companies')
        .then((response) => response.json())
        .then((companies) => {
            const selectElement = document.querySelector('#company-select-purchase');
            companies.forEach((company) => {
                const option = document.createElement('option');
                option.value = company.id_company;
                option.textContent = company.cname;
                selectElement.appendChild(option);
            });
        })
        .catch((error) => console.error('Error fetching companies:', error));

    // Set the date input field to today's date
    const today = new Date().toISOString().split('T')[0];
    document.querySelector('#bdate').value = today;

    // Fetch stock price when company or date changes
    document.querySelector('#company-select-purchase').addEventListener('change', fetchStockPrice);
    document.querySelector('#bdate').addEventListener('change', fetchStockPrice);

    function fetchStockPrice() {
        const company = document.querySelector('#company-select-purchase').value;
        const date = document.querySelector('#bdate').value;
    
        if (company && date) {
            console.log('Fetching stock price for company:', company, 'and date:', date);
            fetch(`/api/stockprice?id_company=${company}&sdate=${date}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Data received from API:', data);
                    if (data && data.length > 0 && data[0].adj_close) {
                        document.querySelector('#cost').value = data[0].adj_close.toFixed(3);
                    } else {
                        document.querySelector('#cost').value = ''; // Clear if no price found
                    }
                })
                .catch((error) => console.error('Error fetching stock price:', error));
        }
    }
    
});

const form = document.querySelector('#purchase-form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    const bdate = formData.get('bdate');
    const stocksBought = formData.get('stocks_bought');
    const cost = formData.get('cost');
    const totalInvestment = (stocksBought * cost).toFixed(3);
    const user = 1;
    const company = formData.get('companies');
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

    fetch('/api/purchase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData),
    });
});

function handleTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            tabButtons.forEach((btn) => btn.classList.remove('active'));

            tabContents.forEach((content) => (content.style.display = 'none'));

            document.getElementById(tabId).style.display = 'block';

            this.classList.add('active');
        });
    });
}

// API connections

async function loadCompanyList() {
    return fetch(`http://localhost:4001/api/companies`)
        .then((response) => response.json())
        .then((data) => {
            pagePurchase.companiesList = data;
            populateCompaniesList(pagePurchase);
        })
        .catch((error) => console.error('Error loading the content:', error));

    function populateCompaniesList(pagePurchase) {
        const companiesListElement = document.getElementById('companies-list');
        companiesListElement.innerHTML = '';
        pagePurchase.companiesList.forEach((company) => {
            const listItem = document.createElement('li');
            listItem.textContent = `(${company.id_company}) ${company.cname}`;
            listItem.addEventListener('click', () => {
                loadBuyTable(company.id_company);
            });
            companiesListElement.appendChild(listItem);
        });
    }
}

async function loadBuyTable(id_company = 'AMZN') {
    try {
        const response = await fetch('http://localhost:4001/api/purchases/' + id_company);
        const transactions = await response.json();

        const tableBody = document.querySelector('#transactions-table tbody');
        tableBody.innerHTML = ''; // Clear any existing rows
        console.log(transactions);
        transactions.forEach((transaction) => {
            const row = document.createElement('tr');

            // Create and append cells
            const idCell = document.createElement('td');
            idCell.textContent = transaction.id_transactionb;
            row.appendChild(idCell);

            const dateCell = document.createElement('td');
            dateCell.textContent = new Date(transaction.bdate).toLocaleDateString();
            row.appendChild(dateCell);

            const stocksCell = document.createElement('td');
            stocksCell.textContent = transaction.stocks_bought;
            row.appendChild(stocksCell);

            const costCell = document.createElement('td');
            costCell.textContent = transaction.cost.toFixed(2);
            row.appendChild(costCell);

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading transactions:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/companies')
        .then((response) => response.json())
        .then((companies) => {
            const selectElement = document.querySelector('#company-select-sale');
            companies.forEach((company) => {
                const option = document.createElement('option');
                option.value = company.id_company;
                option.textContent = company.cname;
                selectElement.appendChild(option);
            });
        })
        .catch((error) => console.error('Error fetching companies:', error));

    // Set the date input field to today's date
    const today = new Date().toISOString().split('T')[0];
    document.querySelector('#sdate').value = today;

    // Fetch stock price when company or date changes
    document.querySelector('#company-select-sale').addEventListener('change', fetchStockPriceSale);
    document.querySelector('#sdate').addEventListener('change', fetchStockPriceSale);

    function fetchStockPriceSale() {
        const company = document.querySelector('#company-select-sale').value;
        const date = document.querySelector('#sdate').value;
    
        if (company && date) {
            console.log('Fetching stock price for company:', company, 'and date:', date);
            fetch(`/api/stockprice?id_company=${company}&sdate=${date}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Data received from API:', data);
                    if (data && data.length > 0 && data[0].adj_close) {
                        document.querySelector('#adj_cost').value = data[0].adj_close.toFixed(3);
                    } else {
                        document.querySelector('#adj_cost').value = ''; // Clear if no price found
                    }
                })
                .catch((error) => console.error('Error fetching stock price:', error));
        }
    }
    
});

const formSale = document.querySelector("#sale-form")

formSale.addEventListener('submit', function(event){
    event.preventDefault();

    const formSale = new FormData(formSale)
     
    const sdate = formSaleData.get('sdate');
    const stocksSold = formSale.get('stocks_sold');
    const adj_cost = formSale.get('adj_cost');
    const totalSold = (stocksSold * adj_cost).toFixed(3);
    const user = 1;
    const company = formSale.get('companies')
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
        id_stock: null
    };

    fetch('/api/sale', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(soldData)
    });
})