document.addEventListener('DOMContentLoaded', async () => {
    loadNavigatingBarSellBuy();
});

// TODO: Make this into a function to recall  
function loadNavigatingBarSellBuy() {
    fetch('/nav-bar.html')
        .then(response => response.text())
        .then(data => {
            console.log(data);
            // Inject the HTML into the DOM
            document.getElementById('nav-bar-bs').innerHTML = data;
        })
        .catch(error => console.error('Error loading the content:', error));
}

