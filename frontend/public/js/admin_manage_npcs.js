/// //////////////////////////////////////////////////////////////////
// Linking to NPCs
/// //////////////////////////////////////////////////////////////////
API_URL += '/npcs';
IMAGE_URL += '/images/';

/// //////////////////////////////////////////////////////////////////
// Initalize Constant to store DOM Elements
/// //////////////////////////////////////////////////////////////////
const content = document.getElementById('contentBody');

// loading window to display data straight without any trigger events
window.onload = () => {
    // send axios request to get all npcs
    axios.get(API_URL, {})
    // response successful
    .then(function (response) {
        for (let i = 0; i < response.data.length; i++) {
            console.log(response.data[i]);
            content.innerHTML += `
            <a href="/admin/view_npc.html?npcid=${response.data[i].npcid}" class="card">
            <img class="image" src="${IMAGE_URL + response.data[i].imageurl}" width="130px" height="130px">
                <div class = "textContainer">
                    <h3 class="mainText">${response.data[i].npcname}</h3>
                    <h3 class="subText">NPC ID: ${response.data[i].npcid}</h3>
                    <h3 class="subText">Image ID: ${response.data[i].imageid}</h3>
                    <h3 class="subText">Floor ID: ${response.data[i].floorid}</h3>
                </div>
            </a>
            `
        }
    })
    // error
    .catch((error) => {
        console.log(error)
    });
};

// search bar function 
searchInput.addEventListener('keypress', event => {
    if (event.key === "Enter") {

        // send axios request to get dialogue if the value matches 
        axios.get(`${API_URL  }/search/${searchInput.value}`)
        // response successful
        .then(function (response) {

            content.innerHTML = ``

            for (i=0; i < response.data.rows.length; i++){
                
                content.innerHTML += `<a href="/admin/update_npc.html?npcid=${response.data.rows[i].npcid}" class="card">
                <img class="image" src="${IMAGE_URL + response.data.rows[i].imageurl}" width="130px" height="130px">
                    <div class = "textContainer">
                        <h3 class="mainText">${response.data.rows[i].npcname}</h3>
                        <h3 class="subText">NPC ID: ${response.data.rows[i].npcid}</h3>
                        <h3 class="subText">Floor ID: ${response.data.rows[i].floorid}</h3>
                    </div>
                </a>
                `
            }
        })
        // error
        .catch((error) => {
            console.log(error)
            alert("NPC not found!")
        });
    }

})