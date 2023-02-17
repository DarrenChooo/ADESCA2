// Linking to users
USER_URL = `${API_URL  }/users/join/`;

// Linking to floors
FLOOR_URL = `${API_URL  }/floors/`;

// Assign elements to a constant
const button = document.getElementById('buttonRow')
const content = document.getElementById('contentBody')
const searchIpt = document.getElementById('searchInput')
const searchIcon = document.getElementById('searchIcon')

const userid = window.localStorage.getItem('userid')

// When loading page print out all Floors with details
window.onload = () => {
    axios({
        method: 'get',
        url: USER_URL + userid
    })
    .then((response) => {
        // Assign response data from backend to new variable 
        const records = response.data

        const {floorid} = records

        // For each floors in database, loop and print out in HTML
        for (let i = 1; i < floorid; i++) {
            axios({
                method: 'get',
                url: FLOOR_URL + (i)
            })
            .then((response) => {
                content.innerHTML += `
                    <div id="${response.data.floorid}" class = "card">
                        <img data-value="${response.data.floorid}" class="contentImg" src = "../images/${response.data.imageurl}">
                        <div data-value="${response.data.floorid}" class = "dataCtn">
                            <h3>Level - ${response.data.floorid}, ${response.data.floorname}</h3>
                        </div>
                    </div>
                `
            })
            .catch((error) => {
                console.log(error)
            })
        }
        content.addEventListener('click', (event) => {
            const floorID = (event.target).getAttribute('data-value')

            localStorage.setItem('newFloorId', floorID)

            window.location.assign(`/user/floor.html`)
        })

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
        url: `${FLOOR_URL  }name/${searchIpt.value}`
    })
    .then((response) => {
        const records = response.data
        content.innerHTML = ""
        for (let i = 0; i < records.length; i++) {
            content.innerHTML += `
            <a href="/user/floor.html">
                <div class = "card">
                    <img class="contentImg" src = "../images/${response.data[i].imageurl}">
                    <div class = "dataCtn">
                        <h3>Level - ${response.data[i].floorid}, ${response.data[i].floorname}</h3>
                    </div>
                </div>
            </a>
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
            url: `${FLOOR_URL  }name/${searchIpt.value}`
        })
        .then((response) => {
            const records = response.data
            content.innerHTML = ""
            // For each floors in database, loop and print out in HTML
            for (let i = 0; i < records.length; i++) {
                content.innerHTML += `
                <a href="/user/floor.html">
                    <div class = "card">
                        <img class="contentImg" src = "../images/${response.data[i].imageurl}">
                        <div class = "dataCtn">
                            <h3>Level - ${response.data[i].floorid}, ${response.data[i].floorname}</h3>
                        </div>
                    </div>
                </a>

                `
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

})

