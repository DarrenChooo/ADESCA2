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

    userid = localStorage.getItem("userid")
    console.log(userid)
    axios.get(`${API_URL }user/${userid}`, {})
        .then(function (body) {
            const post = body.data
            console.log(post)
            let postHTML = ''
            for (let i = 0; i < post.length; i++) {
                postHTML +=
                    `
                    <div class="postCard">
                    <div class="postContainer">
                    <div class="displayDiv1">Post: ${post[i].postdesc}</div>
                    <div class="displayDiv2">Posted by user: ${post[i].userid}</div>
                    <div class="displayDiv3">Post ID: ${post[i].postid}</div>
                    <a class="button" href="/admin/update_post.html?postid=${post[i].postid}">
                        <button type="button" id="updateIdButton">Update</button>
                    </a>
            </div>  
            </div>
            `
            }
            console.log(postHTML)
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
    axios.get(`${API_URL  }/${searchIpt.value}`, {})
        .then((body) => {
            const post = body.data
            let postHTML = ''
            for (let i = 0; i < post.length; i++) {
                postHTML +=
                    `
                    <div class="userCard">
                    <div class="userContainer">
                    <div class="displayDiv1">Post: ${post[i].postdesc}</div>
                    <div class="displayDiv2">Posted by user: ${post[i].userid}</div>
                    <div class="displayDiv3">Post ID: ${post[i].postid}</div>
                    </a>
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
})

// Listen to 'enter' key on search input
searchIpt.addEventListener('keypress', event => {
    if (event.key === "Enter") {
        event.preventDefault()
        axios.get(`${API_URL  }${searchIpt.value}`, {})
            .then((body) => {
                const post = body.data
                let postHTML = ''
                for (let i = 0; i < post.length; i++) {
                    postHTML +=
                        `
                    <div class="userCard">
                    <div class="userContainer">
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