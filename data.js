const yahooFinanceApi = require('yahoo-finance-api-js');

async function getS_P500Data() {
  try {
    // Obtain S&P500 data
    const sp500Data = await yahooFinanceApi.get('^GSPC', {
      period1: new Date('2020-01-01').getTime(),
      period2: new Date().getTime(),
      interval: '1d',
    });

    // Print the data
    console.log(sp500Data);
  } catch (error) {
    console.error('Error obtaining S&P500 data:', error);
  }
}

getS_P500Data();