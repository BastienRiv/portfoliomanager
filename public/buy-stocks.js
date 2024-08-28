// buy-stocks.js
document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/api/stocks');
      const stockData = await response.json();
  
      const stockTableBody = document.getElementById('stock-table-body');
  
      stockData.forEach((stock) => {
        const row = document.createElement('tr');
  
        const idCompanyCell = document.createElement('td');
        idCompanyCell.textContent = stock.id_company;
        row.appendChild(idCompanyCell);
  
        const openingCostCell = document.createElement('td');
        openingCostCell.textContent = `$${stock.opening_cost.toFixed(2)}`;
        row.appendChild(openingCostCell);
  
        const closingCostCell = document.createElement('td');
        closingCostCell.textContent = `$${stock.closing_cost.toFixed(2)}`;
        row.appendChild(closingCostCell);
  
        const adjustedCostCell = document.createElement('td');
        adjustedCostCell.textContent = `$${stock.adj_close.toFixed(2)}`;
        row.appendChild(adjustedCostCell);
  
        const maxCostCell = document.createElement('td');
        maxCostCell.textContent = `$${stock.max_cost.toFixed(2)}`;
        row.appendChild(maxCostCell);
  
        const minCostCell = document.createElement('td');
        minCostCell.textContent = `$${stock.min_cost.toFixed(2)}`;
        row.appendChild(minCostCell);
  
        const volumeCell = document.createElement('td');
        volumeCell.textContent = stock.volume;
        row.appendChild(volumeCell);
  
        const dateCell = document.createElement('td');
        dateCell.textContent = stock.sdate;
        row.appendChild(dateCell);
  
        const idStockCell = document.createElement('td');
        idStockCell.textContent = stock.id_stock;
        row.appendChild(idStockCell);
  
        const actionCell = document.createElement('td');
        const buyButton = document.createElement('button');
        buyButton.textContent = 'Buy';
        buyButton.addEventListener('click', () => buyStock(stock));
        actionCell.appendChild(buyButton);
        row.appendChild(actionCell);
  
        stockTableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  });
  
  function buyStock(stock) {
    // Implement the logic to buy the selected stock
    console.log(`Buying stock with ID Company: ${stock.id_company} and ID Stock: ${stock.id_stock}`);
  }