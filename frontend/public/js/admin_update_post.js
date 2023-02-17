/// //////////////////////////////////////////////////////////////////
// Linking to inventory
/// //////////////////////////////////////////////////////////////////
API_URL += '/posts/';

/// //////////////////////////////////////////////////////////////////on
// Button for update Post by postid
/// //////////////////////////////////////////////////////////////////
const updatePostButton = document.getElementById("updatePostButton")
// postid variable from url
const postid = window.location.search.split('=')[1]
// input postdesc
const UPDATEpost = document.getElementById('UPDATEpostInput');
// display success by postid
const displayUpdate = document.getElementById('displayUpdate');
// Button for delete button
const deleteButton = document.getElementById('DeleteButton')

/// //////////////////////////////////////////////////////////////////
// Function to update post by postid; PUT
/// //////////////////////////////////////////////////////////////////
updateIdButton.onclick = () => {
    axios.put(`${API_URL  }/${postid}`, {
        postdesc: UPDATEpost.value,
    })
        .then((body) => {
            const {updatedPostdesc} = body.data
            let updatedPostHTML = ''
            console.log(updatedPostdesc)
            updatedPostHTML = `
                    <div class="displayDiv1">Results: </div>
                    <div class="displayDiv2">Post has been updated</div>        
            `
            displayUpdate.innerHTML = updatedPostHTML;
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
    axios.delete(`${API_URL  }/${postid}`, {})
        .then((body) => {
            let updatedPostHTML = ''
            updatedPostHTML = `
                    <div class="displayDiv1">Results: </div>
                    <div class="displayDiv2">Post has been deleted</div>        
            `
            displayUpdate.innerHTML = updatedPostHTML;
        })
        .catch((error) => {
            console.log(error)
            alert(error)
        });

};