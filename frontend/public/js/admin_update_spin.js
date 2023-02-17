const SPIN_API_URL = API_URL + "/spin/"
const IMAGES_URL = IMAGE_URL + '/images/';

const itemid = window.location.search.split('=')[1]

// Assigning divisions to a constant
const getItem = document.getElementById("spinItemsContent");
const adminTitle = document.getElementById("adminTitle")

window.onload = () => {

    axios.get(`${SPIN_API_URL}/item/${itemid}`)
    .then(function (response) {
        adminTitle.innerHTML = `Item: ${response.data[0].itemname}`
        const labelItemName = response.data[0].itemname
        getItem.innerHTML = `<div class="card">
                                    <img class="image" src="${IMAGES_URL + response.data[0].imageurl}">
                                        <div class = "textContainer">
                                            <h1 class="mainText">${response.data[0].itemname}</h3>
                                            <form enctype="multipart/form-data" class="updateForm">

                                            <div class="input">
                                            <label for="itemid" class="inputLabel" >Input Item Id:</label>
                                                <input type="text" id="updateItemId" name="itemid" placeholder="${response.data[0].itemid}" required>
                                            </div>
                                            <div class="input">
                                                <label for="itemname" class="inputLabel" >Item Name: ${response.data[0].itemname}</label>
                                            </div>
                                            <div class="input">
                                                <label for="cost" class="inputLabel">Item Cost: ${response.data[0].cost}</label>
                                            </div>
                                            <div class="input">
                                                <label for="imageid" class="inputLabel">Item ImageID: ${response.data[0].imageid}</label>
                                            </div>
                                                <div class="button-container">
                                                    <button class="button" type="button" id="updateButton">Update</button>
                                                </div>

                                            </form>    
                                        </div>
                                    </div>
                                    `
   
   

        const updateItemId = document.getElementById("updateItemId")
        updateButton.onclick = () => {

            const ItemId = updateItemId.value
        
            axios.put(`${SPIN_API_URL}${itemid}`, {
                itemid    : ItemId,
            })
            .then(function () {
                axios.get(`${SPIN_API_URL}/item/${ItemId}`)
                .then(function (response) {
                    alert(`${labelItemName} has been updated to ${response.data[0].itemname}`)
                    window.location.assign("/admin/manage_spin.html")
                })
              
            })
            .catch((error) => {
                // item id does not exist
                if (error.response.status == 404) {
                    alert(`Item Id: ${ItemId} does not exist`)
                } else if (error.response.status == 400){
                    alert(`Item ID: ${ItemId} is not a number`)
                }else if (error.response.status == 409) {
                    alert(`Item Id: ${ItemId} already exists`)
                }else {
                    alert(`Item Id: ${ItemId} has not been updated`)
                console.log(error)
                }
            });
        };
        
        
    }).catch((error) => {
        console.log(error)
    })
    .catch((error) => {
        console.log(error)
    });
}
