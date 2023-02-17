// Linking to inventory
USER_API_URL = `${API_URL  }/users/`;
API_URL += '/inventory/';
IMAGE_URL += '/images/';

// Button for getting inventory by userid
const getInventoryByIdButton = document.getElementById("getInventoryByIdButton")
// input userid
const GETuserIdInput = document.getElementById('GETuserIdInput');
// display inventory by userid
const displayInventoryById = document.getElementById('displayInventoryById');
// get userid from localstorage
const userid = localStorage.getItem('userid')

// Function to GET inventory by ID
window.onload = () => {
            // Get inventory by userid
            axios.get(API_URL + userid, {})
                .then(function (body) {
                    let inventoryHTML = ''
                    const inventory = body.data
                    // Loop through inventory
                        .map(inventory => {
                            inventoryHTML += ` 
                        <a href="/user/inventory_item.html?itemid=${inventory.itemid}">
                    <div class="card">
                        <div class="image-container"> 
                            <img alt="${inventory.itemname}" src="${IMAGE_URL + inventory.imageurl}"/>   
                        </div>
                        <span class="item-title">${inventory.itemname}</span>
                        <span class="item-title">Quanitity: ${inventory.quantity}</span>
                    </div>
                    </a>
                    `
                        })
                        // Display inventory
                    displayInventoryById.innerHTML = inventoryHTML;
                })
        // Error Checking
        .catch((error) => {
            console.log(error)
            alert(error)
        });
};









