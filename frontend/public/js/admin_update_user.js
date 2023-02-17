/// //////////////////////////////////////////////////////////////////
// Linking to inventory
/// //////////////////////////////////////////////////////////////////
API_URL += '/users';

/// //////////////////////////////////////////////////////////////////on
// Button for update by userid
/// //////////////////////////////////////////////////////////////////
const updateIdButton = document.getElementById("updateIdButton")
// userid variable from url
const userid = window.location.search.split('=')[1]
// input itemid
const UPDATEpassword = document.getElementById('UPDATEpasswordInput');
// display success by userid
const displayUpdate = document.getElementById('displayUpdate');
// Button for delete button
const deleteButton = document.getElementById('DeleteButton')


/// //////////////////////////////////////////////////////////////////
// Function to update password by userid; PUT
/// //////////////////////////////////////////////////////////////////
updateIdButton.onclick = () => {
    axios.put(`${API_URL  }/${userid}`, {
        password: UPDATEpassword.value,
    })
        .then((body) => {
            const {updatedPassword} = body.data
            let updatedUserHTML = ''
            console.log(updatedPassword)
            updatedUserHTML = `
                    <div class="displayDiv1">Results: </div>
                    <div class="displayDiv2">Password has been updated</div>        
            `
            displayUpdate.innerHTML = updatedUserHTML;
        })
        .catch((error) => {
            console.log(error)
            alert(error)
        });

};

/// //////////////////////////////////////////////////////////////////
// Function to delete post ;DELETE
/// //////////////////////////////////////////////////////////////////
deleteButton.onclick = () => {
    axios.delete(`${API_URL  }/${userid}`, {})
        .then((body) => {
            let updatedUserHTML = ''
            updatedUserHTML = `
                    <div class="displayDiv1">Results: </div>
                    <div class="displayDiv2">User has been deleted</div>        
            `
            displayUpdate.innerHTML = updatedUserHTML;
        })
        .catch((error) => {
            console.log(error)
            alert(error)
        });

};