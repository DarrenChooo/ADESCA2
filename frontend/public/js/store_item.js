ITEMS_API_URL = `${API_URL}/items/`
CURRENCY_API_URL = `${API_URL}/currency/`
INVENTORY_API_URL = `${API_URL}/inventory/`
IMAGE_URL = `${IMAGE_URL}/images/`

const itemid = window.location.search.split('=')[1]
console.log("itemid", itemid)

const userid = localStorage.getItem("userid")
console.log("userid", userid)

// Assigning divisions to a constant
const storeItem = document.getElementById("storeItem");

window.onload = () => {

    axios.get(`${ITEMS_API_URL  }${itemid}`)
    .then(function (item) {

        document.title = `Stardust Store - ${item.data.itemname}`;

        storeItem.innerHTML = `<div class="card">
                                <img class="image" src="${IMAGE_URL + item.data.imageurl}">
                                    <div class = "textContainer">
                                        <h1 class="mainText">${item.data.itemname}</h1>
                                        <h3 class="subText">Item ID: ${item.data.itemid}</h3>
                                        <h3 class="subText">Item Cost - ${item.data.cost}</h3>
                                        <h3 class="subText">(Minimum Level: ${item.data.levelreq})</h3>
                                        <div class="buttonContainer">
                                            <button id="purchaseButton" disabled>Purchase</button
                                        </div>
                                    </div>
                                    
                                </div>
                                `
        const purchaseButton = document.getElementById("purchaseButton");
        return item
    })
    .then((item)=> {

        axios.get(CURRENCY_API_URL + userid)
        .then((currency) => {

            if (currency.data[0].quantity >= item.data.cost){
                purchaseButton.style.background = '#4298F5';
                purchaseButton.disabled = false;
                purchaseButton.style.cursor = 'pointer';

                purchaseButton.onclick = () => {

                    const quantity = currency.data[0].quantity - item.data.cost

                    axios.put(CURRENCY_API_URL + userid, {
                        quantity
                    })
                    .then(() => {

                        axios.post(INVENTORY_API_URL, {
                            userid,
                            itemid,
                            quantity: 1
                        }).then(() => {

                            alert(`Item ${item.data.itemname} has been purchased`)
                            
                        }).catch((error) => {
                            console.log(error)
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
                    
                }
            }
        })
        .catch((error) => {
            console.log(error)
        });
        
    })
    .catch((error) => {
        console.log(error)
    });
}