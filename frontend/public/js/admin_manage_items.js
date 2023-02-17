API_URL = `${API_URL}/items/`
IMAGE_URL = `${IMAGE_URL}/images/`

const getAllItems = document.getElementById("itemsContent")

window.onload = () => {
    axios.get(API_URL)
    .then(function (response) {
        for (i=0; i < response.data.length; i++){
           
            getAllItems.innerHTML +=  `<a href="/admin/update_items.html?imageid=${response.data[i].itemid}" class="card">
            <img class="image" src="${IMAGE_URL + response.data[i].imageurl}">
                <div class = "textContainer">
                    <h3 class="mainText">${response.data[i].itemname}</h3>
                    <h3 class="subText">Item ID: ${response.data[i].itemid}</h3>
                    <h3 class="subText">Item Cost - ${response.data[i].cost}</h3>
                    <h3 class="subText">(Minimum Level: ${response.data[i].levelreq})</h3>
                </div>
            </a>
            `
        }
    })
    .catch((error) => {
        console.log(error)
    });
};

searchInput.addEventListener('keypress', event => {
    if (event.key === "Enter") {
        event.preventDefault()

        axios.get(`${API_URL  }search/${searchInput.value}`)
        .then(function (response) {

            getAllItems.innerHTML = ``

            for (i=0; i < response.data.length; i++){
                
                getAllItems.innerHTML +=  `<a href="/admin/update_items.html?imageid=${response.data[i].itemid}" class="card">
                <img class="image" src="${IMAGE_URL + response.data[i].imageurl}">
                    <div class = "textContainer">
                        <h3 class="mainText">${response.data[i].itemname}</h3>
                        <h3 class="subText">Item ID: ${response.data[i].itemid}</h3>
                        <h3 class="subText">Item Cost - ${response.data[i].cost}</h3>
                        <h3 class="subText">(Minimum Level: ${response.data[i].levelreq})</h3>
                    </div>
                </a>
                `
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }
})