/// //////////////////////////////////////////////////////////////////
// Linking to inventory
/// //////////////////////////////////////////////////////////////////
API_URL += '/posts/';

/// //////////////////////////////////////////////////////////////////
// Button for getting all post
/// //////////////////////////////////////////////////////////////////
// display all post
const displayPost = document.getElementById('displayPost');
const searchIpt = document.getElementById('searchInput')
const searchIcon = document.getElementById('searchIcon')

/// //////////////////////////////////////////////////////////////////
// Function to get all post; GET ALL
/// //////////////////////////////////////////////////////////////////
window.onload = () => {

    axios.get(API_URL, {})
        .then(function (body) {
            const post = body.data
            let postHTML = ''
            for (let i = 0; i < post.length; i++) {
                postHTML +=
                    `
                    <div class="postCard">
                    <div class="postContainer">
                    <div class="displayDiv1">Post: ${post[i].postdesc}</div>
                    <div class="displayDiv2">Posted by user: ${post[i].userid}</div>
                    <div class="displayDiv3">Post ID: ${post[i].postid}</div>
                </div>
            </div>  
            `
            }
            displayPost.innerHTML = postHTML;
        })
        .catch((error) => {
            console.log(error)
            alert(error)
        });
};

// Listen to click on search icon button
searchIcon.addEventListener('click', event => {
    event.preventDefault()
    console.log(searchIpt.value)
    axios.get(`${API_URL  }/${searchIpt.value}`, {})
        .then((body) => {
            const post = body.data
            let postHTML = ''
                console.log(post)
                postHTML +=
                    `
                    <div class="postCard">
                    <div class="postContainer">
                    <div class="displayDiv1">Post: ${post.postdesc}</div>
                    <div class="displayDiv2">Posted by user: ${post.userid}</div>
                    <div class="displayDiv3">Post ID: ${post.postid}</div>
                </div>
            </div>  
            `
            
            displayPost.innerHTML = postHTML;
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
        axios.get(`${API_URL  }/${searchIpt.value}`, {})
            .then((body) => {
                const post = body.data
            let postHTML = ''
            for (let i = 0; i < post.length; i++) {
                postHTML +=
                    `
                    <div class="postCard">
                    <div class="postContainer">
                    <div class="displayDiv1">Post: ${post[i].postdesc}</div>
                    <div class="displayDiv2">Posted by user: ${post[i].userid}</div>
                    <div class="displayDiv3">Post ID: ${post[i].postid}</div>
                </div>
            </div>  
            `
            }
            displayPost.innerHTML = postHTML;
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            });
    }

})