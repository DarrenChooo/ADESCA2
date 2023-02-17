/// //////////////////////////////////////////////////////////////////
// Linking to inventory
/// //////////////////////////////////////////////////////////////////
API_URL += '/users/';

/// //////////////////////////////////////////////////////////////////
// Button for getting all user
/// //////////////////////////////////////////////////////////////////
// display all user
const displayUser = document.getElementById('displayUser');
const searchIpt = document.getElementById('searchInput')
const searchIcon = document.getElementById('searchIcon')

/// //////////////////////////////////////////////////////////////////
// Function to get all user; GET ALL
/// //////////////////////////////////////////////////////////////////
window.onload = () => {

    axios.get(API_URL, {})
        .then(function (body) {
            const user = body.data
            let userHTML = ''
            for (let i = 0; i < user.length; i++) {
                userHTML +=
                    `
                    <div class="userCard">
                    <div class="userContainer">
                    <div class="displayDiv1">User ID: ${user[i].userid}</div>
                    <div class="displayDiv2">User Name: ${user[i].username}</div>
                    <div class="displayDiv3">Role: ${user[i].role}</div>
                    <div class="displayDiv3">Floorid: ${user[i].floorid}</div>
                    <a class="button" href="/admin/update_user.html?userid=${user[i].userid}">
                    <button type="button" id="updateIdButton">Update</button>
                    </a>
                </div>
            </div>  
            `
            }
            displayUser.innerHTML = userHTML;
        })
        .catch((error) => {
            console.log(error)
            alert(error)
        });
};

// Listen to click on search icon button
searchIcon.addEventListener('click', event => {
    event.preventDefault()
    axios.get(`${API_URL  }${searchIpt.value}`, {})
        .then((body) => {
            const user = body.data
            let userHTML = ''
            for (let i = 0; i < user.length; i++) {
                userHTML +=
                    `
                <div class="userCard">
                    <div class="userContainer">
                    <div class="displayDiv1">User ID: ${user[i].userid}</div>
                    <div class="displayDiv2">User Name: ${user[i].username}</div>
                    <div class="displayDiv3">Role: ${user[i].role}</div>
                    <a class="button" href="/admin/update_user.html?userid=${user[i].userid}">
                        <button type="button" id="updateIdButton">Update</button>
                    </a>
                </div>
            </div> 
            `
            }
            displayUser.innerHTML = userHTML;
        })
        .catch((error) => {
            console.log(error)
            alert(error)
        });
})

// Listen to 'enter' key on search input
searchIpt.addEventListener('keypress', event => {
    if (event.key === "Enter") {
        event.preventDefault()
        axios.get(`${API_URL  }${searchIpt.value}`, {})
            .then((body) => {
                const user = body.data
                let userHTML = ``
                for (let i = 0; i < user.length; i++) {
                    userHTML +=
                        `
                        <div class="userCard">
                <div class="userContainer">
                    <div class="displayDiv1">User ID: ${user[i].userid}</div>
                    <div class="displayDiv2">User Name: ${user[i].username}</div>
                    <div class="displayDiv3">Role: ${user[i].role}</div>
                        <button type="button" id="updateIdButton">Update</button>
                    </a>
                </div>
            </div> 
                `
                }
                displayUser.innerHTML = userHTML;
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            });
    }

})
