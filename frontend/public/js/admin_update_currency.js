/// //////////////////////////////////////////////////////////////////
// Linking to inventory
/// //////////////////////////////////////////////////////////////////
API_URL += '/currency';

/// //////////////////////////////////////////////////////////////////on
// Button for update currency by userid
/// //////////////////////////////////////////////////////////////////
const updateIdButton = document.getElementById("updateIdButton")
// userid variable from url
const userid = window.location.search.split('userid=')[1]
// console.log(userid)

// input quantity
const UPDATEquantityInput = document.getElementById('UPDATEquantityInput');
// display inventory by userid
const displayUpdate = document.getElementById('displayUpdate');


/// //////////////////////////////////////////////////////////////////
// Function to update currency by userid; PUT
/// //////////////////////////////////////////////////////////////////
// Clicks onto update button
updateIdButton.onclick = () => {
    // Update currency by userid
    axios.put(`${API_URL  }/${userid}`, {
        // quantity input
        quantity: UPDATEquantityInput.value
    })
        .then((body) => {
            const {updatedCurrency} = body.data
            let updatedCurrencyHTML = ''
            // console.log(updatedCurrency)
            updatedCurrencyHTML = `
                    <div class="displayDiv1">Results: </div>
                    <div class="displayDiv2">User ID: ${updatedCurrency.userid}</div>
                    <div class="displayDiv4">Quantity: ${updatedCurrency.quantity}</div>              
            `
            // Display updated currency
            displayUpdate.innerHTML = updatedCurrencyHTML;
        })
        // Error
        .catch((error) => {
            const errMsg = error.response.data
            console.log(errMsg)
            alert(errMsg)
        });

};