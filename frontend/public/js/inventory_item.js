// Linking to inventory
USER_API_URL = `${API_URL  }/users/`;
IMAGE_URL += '/images/';
ITEM_API_URL = `${API_URL  }/items/`;
API_URL += '/inventory/';

// input userid
const GETuserIdInput = document.getElementById('GETuserIdInput');
// userid from local storage
const userid = localStorage.getItem('userid')
// itemid variable from url
const splitter = window.location.search.split('itemid=')[1]
const itemid = splitter.split('?userid=')[0]
// display inventory by userid
const displayItemInfo = document.getElementById('displayItemInfo');


// Function to GET inventory by ID
window.onload = () => {
    // Get inventory by userid
    axios.get(`${API_URL  }${userid}/${itemid}`, {})
        .then(function (body) {
            let itemHTML = ''
            // console.log(body.data)
            const item = body.data[0]
            itemHTML += ` 
            
            
                <div class="image-container"> 
                    <img alt="${item.itemname}" src="${IMAGE_URL + item.imageurl}"/>   
                </div>
                <div>
                    <span class="item-title itemname">Name: ${item.itemname}</span>
                    </div>
                    <div>
                    <span class="item-title">Quanitity: ${item.quantity}</span>
                    </div>
                    <div>
                    <span class="item-title">Level Required: ${item.levelreq}</span>
                    </div>
          
           
                    `
            // Display item info
            displayItemInfo.innerHTML = itemHTML;
        })
        // Error Checking
        .catch((error) => {
            // console.log(error)
            // alert("No more item!")
        });
        
};

// quantity input
const UPDATEquantityInput = document.getElementById('UPDATEquantityInput');
updateIdButton.onclick = () => {
    // Delete inventory by userid
    axios.delete(`${API_URL  }${userid}/${itemid}`, {

        data: { // for axios.delete must set data option.
            quantity: UPDATEquantityInput.value
        }

    })
    
            // Get item details
            axios.get(ITEM_API_URL + itemid, {})
                .then(function (body) {
                    const item = body.data
                    // console.log(item)
                    axios.get(`${API_URL  }${userid}/${itemid}`, {})
                        .then(function (body) {
                            // if body.data.length > 0, display body.data[0] else quanitity 0
                            const inv = body.data.length > 0 ? body.data[0] : { quantity: 0 }
                            // console.log(body)
                            // console.log(inv)
                            let deleteHTML = ''
                            // if quantity is 0, display item deleted
                            if (inv.quantity === 0) {
                                deleteHTML += ` 
                                    <div>
                                            <h2 class="deleteText">You are have no more ${item.itemname}!</h2>
                                    </div>`
                            // if quantity is not 0, display item quantity
                            } else {
                                deleteHTML += ` 
                                <div>
                                        <h2 class="deleteText">You are left with ${inv.quantity} ${item.itemname}!</h2>
                                </div>
                                `
                            }
                            // Display deleted item
                            displayDeleted.innerHTML = deleteHTML;
                            const myTimeout = setTimeout(reload, 900);
                            function reload() {
                                location.reload();
                              }
                        })
                })
                // Error Checking
                .catch((error) => {
                    console.log(error)
                    alert(error)
                })

      
        // Error Checking
        .catch((error) => {
            console.log(error)
            alert(error)
        });
};










