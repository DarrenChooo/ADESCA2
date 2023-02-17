API_URL = `${API_URL}/items/`
IMAGE_URL = `${IMAGE_URL}/images/`



const postItemName = document.getElementById("postItemName")
const postCost = document.getElementById("postCost")
const postLevelReq = document.getElementById("postLevelReq")
const postImageId = document.getElementById("postImageId")

postButton.onclick = () => {

    const ItemName = postItemName.value
    const Cost = postCost.value
    const LevelReq = postLevelReq.value
    const ImageId = postImageId.value

    axios.post(API_URL, {
        itemname    : ItemName,
        cost        : Cost,
        levelreq    : LevelReq,
        imageid     : ImageId,
    })
    .then(function () {
        alert(`Item ${ItemName} has been created`);
        window.location.assign("/admin/manage_items.html")
    })
    .catch((error) => {
        console.log(error)
    });
};