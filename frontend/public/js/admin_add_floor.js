// Linking to floors
API_URL += '/floors/';

// Assign elements to a constant
const submitBtn = document.getElementById('submitBtn')

// Listen to click on submit button
submitBtn.addEventListener('click', event => {    
    const id = document.getElementById('imageIdIpt')
    const name = document.getElementById('floorNameIpt')

    const floor = name.value
    const imageID = id.value

    event.preventDefault()
    axios({
        method: 'post',
        url: API_URL,
        data: {
            floorName: floor,
            imageId: imageID,
        }
    })
    .then((response) => {
        alert('New Floor Inserted')
        location.reload()
    })
    .catch((error) => {
        alert('Please enter a valid name or imageid')
        console.log(error)
    })
})