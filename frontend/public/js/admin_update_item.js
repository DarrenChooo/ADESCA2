API_URL = `${API_URL}/items/`
IMAGE_URL = `${IMAGE_URL}/images/`

const itemid = window.location.search.split('=')[1]
console.log("itemid", itemid)

// Assigning divisions to a constant
const getItem = document.getElementById("itemContent");
const adminTitle = document.getElementById("adminTitle")

window.onload = () => {

    axios.get(`${API_URL  }${itemid}`)
    .then(function (response) {

        adminTitle.innerHTML = `Item: ${response.data.itemname}`

        getItem.innerHTML = `<div class="card">
                                    <img class="image" src="${IMAGE_URL + response.data.imageurl}">
                                        <div class = "textContainer">
                                            <h1 class="mainText">${response.data.itemname}</h3>
                                            <form enctype="multipart/form-data" class="updateForm">

                                            <div class="input">
                                                <label for="itemname" class="inputLabel" >Input Item Name:</label>
                                                    <input type="text" id="updateItemName" name="itemname" placeholder="${response.data.itemname}" required>
                                            </div>
                                            <div class="input">
                                                <label for="cost" class="inputLabel">Input Item Cost:</label>
                                                    <input type="text" id="updateCost" name="cost" placeholder="${response.data.cost}" required>
                                            </div>
                                            <div class="input">
                                                <label for="levelreq" class="inputLabel">Input Level Requirement:</label>
                                                    <input type="text" id="updateLevelReq" name="levelreq" placeholder="${response.data.levelreq}" required>
                                            </div>
                                            <div class="input">
                                                <label for="imageid" class="inputLabel">Input Item ImageID:</label>
                                                    <input type="text" id="updateImageId" name="imageid" placeholder="${response.data.imageid}" required>
                                            </div>
                                            <br/>
                                                <div class="button-container">
                                                    <button class="button" type="button" id="updateButton">Update</button>
                                                    <button class="button" type="button" id="deleteButton">Delete</button>
                                                </div>

                                            </form>    
                                        </div>
                                    </div>
                                    `
    })
    .then(() => {

        const updateItemName = document.getElementById("updateItemName")
        const updateCost = document.getElementById("updateCost")
        const updateLevelReq = document.getElementById("updateLevelReq")
        const updateImageId = document.getElementById("updateImageId")
        
        updateButton.onclick = () => {

            const ItemName = updateItemName.value
            const Cost = updateCost.value
            const LevelReq = updateLevelReq.value
            const ImageId = updateImageId.value
        
            axios.put(`${API_URL  }${itemid}`, {
                itemname    : ItemName,
                cost        : Cost,
                levelreq    : LevelReq,
                imageid     : ImageId,
            })
            .then(function () {
                alert(`Item ${itemid} has been updated`);
                window.location.reload()
            })
            .catch((error) => {
                console.log(error)
            });
        };

        deleteButton.onclick = () => {
        
            axios.delete(`${API_URL  }${itemid}`)
            .then(function () {
                alert(`Item ${itemid} has been deleted`)
                window.location.assign("/admin/manage_items.html")
            })
            .catch((error) => {
                console.log(error)
            });
        };
        
    })
    .then(()=> {
    })
    .catch((error) => {
        console.log(error)
    });
}
