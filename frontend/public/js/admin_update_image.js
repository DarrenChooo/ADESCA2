API_URL = `${API_URL}/image/`
IMAGE_URL = `${IMAGE_URL}/images/`

const imageid = window.location.search.split('=')[1]
console.log("imageid", imageid)

// Assigning divisions to a constant
const title = document.getElementById("adminTitle");
const getAllImages = document.getElementById("imageContent");

// Assigning buttons to a constant





window.onload = () => {
    
    axios.get(`${API_URL  }${imageid}`)
    .then(function (response) {
        title.innerHTML = `Image: ${response.data.imagename}`

        getAllImages.innerHTML = `<div class="card">
                                    <img class="image" src="${IMAGE_URL + response.data.imageurl}" width="130px" height="130px">
                                        <div class = "textContainer">
                                            <h1 class="mainText">${response.data.imagename}</h3>
                                            <form enctype="multipart/form-data" class="updateForm">
                                            <div class="input">
                                                <label for="image" class="inputLabel">Change Image:</label>
                                                    <input type="file" id="updateImage" name="imagefile">
                                            </div>
                                            <div class="input">   
                                                <label for="imagename" class="inputLabel">Change Image Name:</label>
                                                    <input type="text" id="updateImageName" name="imagename" placeholder="${response.data.imagename}">
                                            </div>
                                            <div class="input">
                                                <label for="imagesorter" class="inputLabel">Change Image Type:</label>
                                                    <select id="updateImageSorter" name="imagesorter" placeholder="${response.data.imagesorter}">
                                                        <option value="Item">Item</option>
                                                        <option value="Floor">Floor</option>
                                                        <option value="NPC">NPC</option>
                                                        <option value="Boss">Boss</option>
                                                        <option value="Player">Player</option>
                                                        <option value="Others">Others</option>
                                                    </select>
                                            </div>
                                               <br/>
                                               <br/>
                                                <div class="button-container">
                                                    <button class="button" type="button" id="updateButton">Update</button>
                                                    <button class="button" type="button" id="deleteButton">Delete</button>
                                                </div>
                                        </div>
                                    </div>
                                    `
    })
    .then(() => {

        const updateButton = document.getElementById("updateButton");

        // Assigning inputs to a constant
        const updateImageName = document.getElementById("updateImageName");
        const updateImageSorter = document.getElementById("updateImageSorter");
        const updateImage = document.getElementById("updateImage");

        updateButton.onclick = () => {

            const ImageName = updateImageName.value
            const ImageSorter = updateImageSorter.value
        
            console.log("FILES: ", updateImage.files);
        
            if (updateImage.files.length == 0){
                event.preventDefault()
        
                axios.put(`${API_URL  }${imageid}`, {
                    "imagename": ImageName,
                    "imagesorter": ImageSorter
                })
                .then(() => {
                    window.location.reload()
                    alert(`Image ${imageid} has been updated`)
                })
                .catch((err) => {
                    console.log(err)
                })
            }
            else {
                const Image = updateImage.files[0]
                const formData = new FormData()
                formData.append("imagefile", Image)
        
                axios.put(`${API_URL  }file/${imageid}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then(function (ImageURL) {
                    const filename = ImageURL.data
                    console.log(filename)
        
                    axios.put(`${API_URL  }${imageid}`, {
                        "imageurl": filename,
                        "imagename": ImageName,
                        "imagesorter": ImageSorter
                    })
                    .then(() => {
                        window.location.reload()
                        alert(`Image ${imageid} has been updated`)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
        
                })
                .catch((error) => {
                    console.log(error)
                });
            }
        };

        const deleteButton = document.getElementById("deleteButton");

        deleteButton.onclick = () => {
        
            axios.delete(`${API_URL  }${imageid}`)
            .then(function () {
                console.log("Hello World!")
                alert(`image ${imageid} has been deleted`)
                window.location.assign("/admin/manage_images.html?pagination=1")
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

