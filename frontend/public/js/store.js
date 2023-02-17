ITEMS_API_URL = `${API_URL  }/items/`;
USER_API_URL = `${API_URL  }/users/`
IMAGE_URL += '/images/';

const getInventoryByIdButton = document.getElementById("getInventoryByIdButton")

const storeItems = document.getElementById('storeItems');


window.onload = () => {

    const userid = localStorage.getItem('userid');

    axios.get(`${USER_API_URL  }join/${  userid}`, {})
        .then(function (response) {

                console.log(response)

            axios.get(`${ITEMS_API_URL  }store/${  response.data.floorid}`, {})
            .then(function (response) {
                storeItems.innerHTML = ``;
                console.log(response.data)
            
                const items = response.data
           
               for (i=0; i < items.length; i++){
                storeItems.innerHTML += ` 
                <a href="/user/store_item.html?itemid=${items[i].itemid}" class="card">
                <div class="image-container"> 
                    <img alt="${items[i].itemname}" src="${IMAGE_URL + items[i].imageurl}"/>   
                </div>
                <h3 class="item-title">${items[i].itemname}</h3>
                <span class="item-title">Cost: ${items[i].cost}</span>
                </a>
                `  
               }
                                        
                           
        })
        
            .catch((error) => {
                console.log(error)
                alert(error)
            });

        })
        .catch((error) => {
            console.log(error)
            alert(error)
        });
};









