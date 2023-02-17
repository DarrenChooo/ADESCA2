// Linking to floors
API_URL += '/floors/';

// Assign elements to a constant
const button = document.getElementById('buttonRow')
const content = document.getElementById('contentBody')
const searchIpt = document.getElementById('searchInput')
const searchIcon = document.getElementById('searchIcon')

// When loading page print out all Floors with details
window.onload = () => {
    axios({
        method: 'get',
        url: `${API_URL  }allFloors`
    })
    .then((response) => {
        // Assign response data from backend to new variable 
        const records = response.data
        // const totalRecord = response.data.length
        // let totalPage = totalRecord / 2

        // for (let i = 0; i < totalPage; i++) {
        //     button.innerHTML += `<button id="button" value="${i+1}" type="button">${i+1}</button>`
        // }

        // For each floors in database, loop and print out in HTML
        for (let i = 0; i < records.length; i++) {
            content.innerHTML += `
            <div class = "card">
                <img class="contentImg" src = "../images/${response.data[i].imageurl}">
                <div class = "dataCtn">
                    <h3>Level - ${response.data[i].floorid}, ${response.data[i].floorname}</h3>
                    <a href="/admin/update_floor.html?floorid=${response.data[i].floorid}">
                        <button class="updateBtn">Update</button>    
                    </a>  
                    <button id="deleteBtn${response.data[i].floorid}" class="deleteBtn">Delete</button>    
                </div>
            </div>
            `
        }
    })
    .then(() => {
        // Assign element to a variable
        const deleteBtns = document.getElementsByClassName('deleteBtn')

        // For each floors, store a unique ID for delete buttons
        for (let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].addEventListener('click', event => {
                event.preventDefault()
                const floorid = deleteBtns[i].outerHTML.split('=')[1].split('"')[1].split('Btn')[1]
                axios({
                    method: 'delete',
                    url: `${API_URL  }/${floorid}`
                })
                .then((response) => {
                    alert(response.data.message)
                    location.reload()
                })
                .catch((error) => {
                    window.alert(`Failed to delete existing floor, key in a valid id`)
                    console.log(error)
                })
            })
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

// Listen to click on search icon button
searchIcon.addEventListener('click', event => {
    event.preventDefault()

    axios({
        method: 'get',
        url: `${API_URL  }name/${searchIpt.value}`
    })
    .then((response) => {
        const records = response.data
        content.innerHTML = ""
        for (let i = 0; i < records.length; i++) {
            content.innerHTML += `
            <div class = "card">
                <img class="contentImg" src = "../images/${response.data[i].imageurl}">
                <div class = "dataCtn">
                    <h3>Level - ${response.data[i].floorid}, ${response.data[i].floorname}</h3>
                    <a href="/admin/update_floor.html?floorid=${response.data[i].floorid}">
                        <button class="updateBtn">Update</button>    
                    </a>   
                    <button id="deleteBtn${response.data[i].floorid}" class="deleteBtn">Delete</button>    
                </div>
            </div>
            `
        }
    })
    .catch((error) => {
        console.log(error)
    })
})

// Listen to 'enter' key on search input
searchIpt.addEventListener('keypress', event => {
    if (event.key === "Enter") {
        event.preventDefault()

        axios({
            method: 'get',
            url: `${API_URL  }name/${searchIpt.value}`
        })
        .then((response) => {
            const records = response.data
            content.innerHTML = ""
            // For each floors in database, loop and print out in HTML
            for (let i = 0; i < records.length; i++) {
                content.innerHTML += `
                <div class = "card">
                    <img class="contentImg" src = "../images/${response.data[i].imageurl}">
                    <div class = "dataCtn">
                        <h3>Level - ${response.data[i].floorid}, ${response.data[i].floorname}</h3>
                        <a href="/admin/update_floor.html?floorid=${response.data[i].floorid}">
                            <button class="updateBtn">Update</button>    
                        </a>  
                        <button id="deleteBtn${response.data[i].floorid}" class="deleteBtn">Delete</button>    
                    </div>
                </div>
                `
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

})

