const SPIN_API_URL = API_URL + "/spin/"
const IMAGES_URL = IMAGE_URL + '/images/';

const postItemId = document.getElementById("postItemId")



postButton.onclick = () => {
    const inputValue = postItemId.value
    const arrItems = inputValue.split(",")

    // stringItems.forEach((itemid) => {
    //     const intItemId = parseInt(itemid)
    axios.get(`${SPIN_API_URL}/all`)
        .then(function (response) {
            const numInputsAllowed = 6-response.data.length
            if (arrItems.length <= numInputsAllowed) {
                
                axios.post(`${SPIN_API_URL}/item`, {
                    itemid: inputValue,
                })
                    .then(function () {
                        alert(`Item Id: ${inputValue} has been added`);
                        // alert(`${stringItems} has been created`);
                        window.location.assign("/admin/manage_spin.html")
                    })
                    .catch((error) => {
                        // duplicate itemid
                        if (error.response.status == 409) {
                            alert(`Item Id: ${inputValue} already exists`)
                        } else if (error.response.status == 400){
                            alert(`Item ID: ${inputValue} is not a number`)
                        }else if (error.response.status == 404) {
                            alert(`Item Id: ${inputValue} does not exist`)
                        } else {
                        alert(`Item Id: ${inputValue} has not been added`)
                        // console.log(error)
                        }
                    });
                    // if response.data.length == 6, then alert that you cannot add anymore items
                } else if (response.data.length == 6){
                    alert(`You cannot add anymore items`)
                    window.location.assign("/admin/manage_spin.html")
                } else if (arrItems.length > numInputsAllowed) {
                    alert(`You can only add ${numInputsAllowed} more items`)
                }
                else {
                    alert(`You can only add ${numInputsAllowed} more items`)
                }
        }).catch((error) => {
            console.log(error)
        });
    // })

};