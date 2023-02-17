// Linking to floors
API_URL += '/floors/';

// Assign elements to a constant
const content = document.getElementById('contentBody')
const floorid = window.location.search.split('=')[1]

// When loading page print out all Floors with details
window.onload = () => {
    axios({
        method: 'get',
        url: API_URL + floorid
    })
    .then((response) => {
        // Print out the corresponding floor information on the html page
        content.innerHTML = `
        <div class = "card">
            <img class="contentImg" src = "../images/${response.data.imageurl}">
            <div class="dataCtn">
                <form>
                    <div class="input">
                        <input type="text" id="imageIdIpt" placeholder="${response.data.imageid}"/>
                        <label class="inputLabel">Image ID</label>
                    </div>
                    <div class="input">
                        <input type="text" id="floorNameIpt" placeholder="${response.data.floorname}"/>
                        <label class="inputLabel">Floor Name</label>
                    </div>
                    <div class="btnCtn">
                        <button id="submitBtn">Submit</button>
                    </div>
                </form>

            </div>
        </div>
        `

        const submitBtn = document.getElementById('submitBtn')

        // Listen to click on submit button
        submitBtn.addEventListener('click', event => {
            // Assign elements to a variable
            const id = document.getElementById('imageIdIpt')
            const name = document.getElementById('floorNameIpt')
    
            const floor = name.value
            const imageID = id.value
            let newImageID; let newFloor 
    
            // Check whether admin has entered variables <- Needed for SQl Coalesce
            if (floor && imageID) {
                newImageID = imageID
                newFloor = floor
            } else if (floor) {
                newFloor = floor
                newImageID = null
            } else {
                newFloor = null
                newImageID = imageID
            }
            
            event.preventDefault()
            axios({
                method: 'put',
                url: `${API_URL  }${floorid}`,
                data: {
                    floorName: newFloor,
                    imageId: newImageID
                }
            })
            .then((response) => {
                alert(response.data.message)
                location.reload()
            })
            .catch((error) => {
                alert('Please enter a valid name or imageid')
                console.log(error)
            })
        })
    })
    .catch((error) => {
        console.log(error)
    })
}
