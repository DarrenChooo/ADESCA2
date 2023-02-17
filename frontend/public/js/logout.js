logout = document.getElementById("LogOutButton")

logout.addEventListener('click', event => {
    const userid = localStorage.getItem("userid")
    console.log(userid)
    axios({
        method: 'put',
        url: `${API_URL  }/status/${userid}`,
        data: {
            status: "offline"
        }
    })
    .then((response) => {
        console.log(`Updated userid:${userid}'s status to offline`);
        event.preventDefault();
        localStorage.clear();
        window.location.replace('./../index.html');
    })
    .catch((error) => {
        console.log(error)
    })
})