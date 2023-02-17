API_URL = `${API_URL}/image/`
IMAGE_URL = `${IMAGE_URL}/images/`

const pagination = window.location.search.split('=')[1]

// Assigning divisions to a constant
const getAllImages = document.getElementById("imagesContent")

window.onload = () => {
    axios.get(`${API_URL  }page/${  pagination}`)
    .then(function (response) {
        for (i=0; i < response.data.length; i++){
           
            getAllImages.innerHTML += `<a href="/admin/update_images.html?imageid=${response.data[i].imageid}" class="card">
                <img class="image" src="${IMAGE_URL + response.data[i].imageurl}" width="130px" height="130px">
                    <div class = "textContainer">
                        <h3 class="mainText">${response.data[i].imagename}</h3>
                        <h3 class="subText">ImageID: ${response.data[i].imageid}</h3>
                        <h3 class="subText">Image Category - ${response.data[i].imagesorter}</h3>
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

            getAllImages.innerHTML = ``

            for (i=0; i < response.data.length; i++){
                
                getAllImages.innerHTML += `<a href="/admin/update_images.html?imageid=${response.data[i].imageid}" class="card">
                <img class="image" src="${IMAGE_URL + response.data[i].imageurl}" width="130px" height="130px">
                    <div class = "textContainer">
                        <h3 class="mainText">${response.data[i].imagename}</h3>
                        <h3 class="subText">ImageID: ${response.data[i].imageid}</h3>
                        <h3 class="subText">Image Category - ${response.data[i].imagesorter}</h3>
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
