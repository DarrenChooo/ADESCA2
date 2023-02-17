API_URL = `${API_URL}/image/`
IMAGE_URL = `${IMAGE_URL}/images/`

const postButton = document.getElementById("postButton");

const postImageName = document.getElementById("postImageName");
const postImageSorter = document.getElementById("postImageSorter");
const postImage = document.getElementById("postImage");


postButton.onclick = () => {

    const Image = postImage.files[0]
    const formData = new FormData()
    formData.append("imagefile", Image)
    const ImageName = postImageName.value
    const ImageSorter = postImageSorter.value
    console.log(formData)
    console.log(Image)
    axios.post(`${API_URL  }file`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    .then(function (ImageURL) {
        const filename = ImageURL.data
        axios.post(API_URL, {
            "imageurl": filename,
            "imagename": ImageName,
            "imagesorter": ImageSorter
        })
        .then(() => {
            alert(`Image ${ImageName} has been created`)
            window.location.assign("/admin/manage_images.html?pagination=1")
        })
        .catch((err) => {
            console.log(err)
        })

    })
    .catch((error) => {
        console.log(error)
    });
};