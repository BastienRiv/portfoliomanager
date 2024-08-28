const pagePurchase = {
    companiesList: [],
};

loadData();

document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/companies')
        .then((response) => response.json())
        .then((companies) => {
            const selectElement = document.querySelector('#company-select');
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
    document.querySelector('#company-select').addEventListener('change', fetchStockPrice);
    document.querySelector('#bdate').addEventListener('change', fetchStockPrice);

    function fetchStockPrice() {
        const company = document.querySelector('#company-select').value;
        const date = document.querySelector('#bdate').value;

        if (company && date) {
            fetch(`/api/stockprice?company=${company}&date=${date}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data && data.price) {
                        document.querySelector('#cost').value = data.price.toFixed(3);
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

document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            // Remove active class from all buttons
            tabButtons.forEach((btn) => btn.classList.remove('active'));

            // Hide all tab contents
            tabContents.forEach((content) => (content.style.display = 'none'));

            // Show the selected tab content
            document.getElementById(tabId).style.display = 'block';

            // Add active class to the clicked button
            this.classList.add('active');
        });
    });
});

// Load Initial Page data and populate

async function loadData() {
    return fetch(`http://localhost:4001/api/companies`)
        .then((response) => response.json())
        .then((data) => {
            pagePurchase.companiesList = data;
            populateCompaniesList(pagePurchase);
        })
        .catch((error) => console.error('Error loading the content:', error));
}

function populateCompaniesList(pagePurchase) {
    const companiesListElement = document.getElementById('companies-list');
    pagePurchase.companiesList.forEach((company) => {
        const listItem = document.createElement('li');
        listItem.textContent = `(${company.id_company}) ${company.cname}`;
        companiesListElement.appendChild(listItem);
    });
}
