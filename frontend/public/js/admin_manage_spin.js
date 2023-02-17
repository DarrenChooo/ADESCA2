const SPIN_API_URL = API_URL + "/spin/"
const IMAGES_URL = IMAGE_URL + '/images/';
// console.log(IMAGES_URL)
// console.log(SPIN_API_URL)


const getAllItems = document.getElementById("spinItemsContent")

window.onload = () => {
    axios.get(`${SPIN_API_URL }/all`)
    .then(function (response) {
        for (i=0; i < response.data.length; i++){

            getAllItems.innerHTML +=  `<a href="/admin/update_spin.html?itemid=${response.data[i].itemid}" class="card">
            <img class="image" src="${IMAGES_URL + response.data[i].imageurl}">
                <div class = "textContainer">
                    <h3 class="mainText">${response.data[i].itemname}</h3>
                    <h3 class="subText">Item ID: ${response.data[i].itemid}</h3>
                    <h3 class="subText">Item Cost - ${response.data[i].cost}</h3>
                </div>
            </a>
            `
        }
    })
    .catch((error) => {
        console.log(error)
    });
};

searchIcon.addEventListener('click', event => {
  
        event.preventDefault()

        axios.get(`${SPIN_API_URL}/search/${searchInput.value}`)
        .then(function (response) {
            if (response.data.length == 0) {
                alert("No results found");
                 // return to previous page
                return;
            }  

            getAllItems.innerHTML = ``

            for (i=0; i < response.data.length; i++){

                getAllItems.innerHTML +=  `<a href="/admin/update_spin.html?itemid=${response.data[i].itemid}" class="card">
                <img class="image" src="${IMAGES_URL + response.data[i].imageurl}">
                    <div class = "textContainer">
                        <h3 class="mainText">${response.data[i].itemname}</h3>
                        <h3 class="subText">Item ID: ${response.data[i].itemid}</h3>
                        <h3 class="subText">Item Cost - ${response.data[i].cost}</h3>
                    </div>
                </a>
                `
            }
        })
        .catch((error) => {
            console.log(error)
        });
    
})