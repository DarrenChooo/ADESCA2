/// //////////////////////////////////////////////////////////////////
// Linking to inventory
/// //////////////////////////////////////////////////////////////////
API_URL = `${API_URL}/posts/`;

/// //////////////////////////////////////////////////////////////////
// ELements for webpage
/// //////////////////////////////////////////////////////////////////
const displayUser = document.getElementById('displayUser');
const createPost = document.getElementById('insertPostdesc');
const submitBtn = document.getElementById('createPostButton');

/// //////////////////////////////////////////////////////////////////
// Function to get all post; GET BY USERID
/// //////////////////////////////////////////////////////////////////

// Listen to click on submit button
submitBtn.addEventListener('click', event => {    
    const userid = localStorage.getItem("userid")

    axios.post(`${API_URL  }/${userid}`, {
        postdesc: createPost.value,
    })
        .then((body) => {
            const {updatedPostdesc} = body.data
            let updatedPostHTML = ''
            console.log(updatedPostdesc)
            updatedPostHTML = `
                    <div class="displayDiv1">Results: </div>
                    <div class="displayDiv2">Post has been Create</div>        
            `
            displayUpdate.innerHTML = updatedPostHTML;
        })
        .catch((error) => {
            console.log(error)
            alert(error)
        });
})