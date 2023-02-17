/// //////////////////////////////////////////////////////////////////
// Linking to inventory
/// //////////////////////////////////////////////////////////////////
API_URL = `${API_URL}/users/`;
IMAGE_URL = `${IMAGE_URL}/images/`;

/// //////////////////////////////////////////////////////////////////
// Button for getting user id
/// //////////////////////////////////////////////////////////////////
// display all post
const displayUser = document.getElementById('displayUser');
const getAllImages = document.getElementById('getProfileImage');

/// //////////////////////////////////////////////////////////////////
// Function to get all post; GET BY USERID
/// //////////////////////////////////////////////////////////////////
window.onload = () => {

    userid = localStorage.getItem("userid")
    console.log(userid)
    axios.get(`${API_URL  }join/${userid}`, {})
        .then(function (body) {
            console.log(`image`,body.data.userimageurl)
                    getAllImages.innerHTML += `
                    <img class="image" src="${IMAGE_URL + body.data.userimageurl}" width="230px" height="230px">       
                `
            const user = body.data
            console.log(user.username)
            console.log(user.floorid)
            let userHTML = ''
            userHTML +=
                `              
                    <div class="userContainer">
                    <div class="displayDiv1">Username: ${user.username}</div>
                    <div class="displayDiv2">Userid: ${userid}</div>
                    <div class="displayDiv2">Currently on floor ${user.floorid}, ${user.floorname}</div>       
                    <div class="displayDiv2">You have ${user.quantity} currency</div> 
            </div>
            `

            console.log(userHTML)
            displayUser.innerHTML = userHTML;

        })
        .catch((error) => {
            console.log(error)
            alert(error)
        });


};