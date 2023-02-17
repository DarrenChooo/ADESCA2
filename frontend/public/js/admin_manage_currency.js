/// //////////////////////////////////////////////////////////////////
// Linking to inventory
/// //////////////////////////////////////////////////////////////////
API_URL += '/currency/';

/// //////////////////////////////////////////////////////////////////
// Button for getting all currency
/// //////////////////////////////////////////////////////////////////
// display all currency
const displayCurrency = document.getElementById('displayCurrency');
const searchIpt = document.getElementById('searchInput')
const searchIcon = document.getElementById('searchIcon')

/// //////////////////////////////////////////////////////////////////
// Function to get all currency; GET ALL
/// //////////////////////////////////////////////////////////////////
// All currency when the page loads
window.onload = () => {
    // Get all currency
    axios.get(`${API_URL  }/all`, {})
        .then(function (body) {
            const currency = body.data
            let currencyHTML = ''
            // console.log(currency)
            // Loop through all currency
            for (let i = 0; i < currency.length; i++) {
                currencyHTML +=
                    `
            <div class="currencyCard">
                    <span class="displayDiv1">User ID: ${currency[i].userid}</span>
                    <span class="displayDiv2">Username: ${currency[i].username}</span>
                    <span class="displayDiv3">Quantity: ${currency[i].quantity}</span>
                    <span class="displayDiv4">Currency ID: ${currency[i].currencyid}</span>
                    <a class="button" href="/admin/update_currency.html?userid=${currency[i].userid}">
                        <button type="button" id="updateIdButton">Update</button>
                    </a>             
            </div>
            
            `
            }
            // Display all currency
            displayCurrency.innerHTML = currencyHTML;
        })
        // Error
        .catch((error) => {
            console.log(error)
            alert(error)
        });
};

// Listen to click on search icon button
searchIcon.addEventListener('click', event => {
    // Prevent page from reloading
    event.preventDefault()
    // Get search input
    axios.get(`${API_URL  }search/${searchIpt.value}`, {})
        .then((body) => {
            const currency = body.data
            let currencyHTML = ``
            // Loop through all currency
            for (let i = 0; i < currency.length; i++) {
                currencyHTML +=
                    `
            <div class="currencyCard">
                    <div class="displayDiv1">User ID: ${currency[i].userid}</div>
                    <span class="displayDiv2">Username: ${currency[i].username}</span>
                    <div class="displayDiv3">Quantity: ${currency[i].quantity}</div>
                    <div class="displayDiv4">Currency ID: ${currency[i].currencyid}</div>
                    <a class="button" href="/admin/update_currency.html?userid=${currency[i].userid}">
                        <button type="button" id="updateIdButton">Update</button>
                    </a>
            </div>
            
            `
            }
            // Display all currency
            displayCurrency.innerHTML = currencyHTML;
        })
        // Error
        .catch((error) => {
            console.log(error)
            alert("Please enter a valid userid")
        });
})

// Listen to 'enter' key on search input
searchIpt.addEventListener('keypress', event => {
    if (event.key === "Enter") {
        // Prevent page from reloading
        event.preventDefault()
        // Get search input
        axios.get(`${API_URL  }search/${searchIpt.value}`, {})
            .then((body) => {
                const currency = body.data
                let currencyHTML = ``
                // Loop through all currency
                for (let i = 0; i < currency.length; i++) {
                    currencyHTML +=
                        `
                <div class="currencyCard">
                        <div class="displayDiv1">User ID: ${currency[i].userid}</div>
                        <span class="displayDiv2">Username: ${currency[i].username}</span>
                        <div class="displayDiv3">Quantity: ${currency[i].quantity}</div>
                        <div class="displayDiv4">Currency ID: ${currency[i].currencyid}</div>
                        <a class="button" href="/admin/update_currency.html?userid=${currency[i].userid}">
                        <button type="button" id="updateIdButton">Update</button>
                    </a>
                </div>
                
                `
                }
                // Display all currency
                displayCurrency.innerHTML = currencyHTML;
            })
            // Error
            .catch((error) => {
                console.log(error)
                alert("Please enter a valid userid")
            });
    }

})
