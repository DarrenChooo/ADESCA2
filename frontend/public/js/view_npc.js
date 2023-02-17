/// //////////////////////////////////////////////////////////////////
// Linking to NPCs
/// //////////////////////////////////////////////////////////////////
API_URL += '/npcs';
IMAGE_URL += '/images/';

/// //////////////////////////////////////////////////////////////////
// Initalize Constant to store DOM Elements
/// //////////////////////////////////////////////////////////////////
const content = document.getElementById('contentBody');
const headerTitle = document.getElementById('adminTitle');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const getNpcId = urlParams.get('npcid');

window.onload = () => {
    // axios get request for NPC data   
    axios.get(`${API_URL  }/${getNpcId}`, {})
    // response successful
    .then(function (response) {
        console.log(response.data[0].npcname)
        headerTitle.innerHTML = `NPC Name: ${response.data[0].npcname}`

        for (let i = 0; i < response.data.length; i++) {
            console.log(response.data[i]);
            content.innerHTML = `
            <img class="image" src="${IMAGE_URL + response.data[i].imageurl}" width="100%" height="60%">
                <div class = "textContainer">
                    <h3 class="subText">NPC ID: ${response.data[i].npcid}</h3>
                    <h3 class="subText">Image ID: ${response.data[i].imageid}</h3>
                    <h3 class="subText">Floor ID: ${response.data[i].floorid}</h3>
                </div>
                
                <div class="btnCtn">
                <a href="/admin/update_npc.html?npcid=${response.data[i].npcid}">
                    <button id="submitBtn" type="button">Update</button>
                </a>

                <a href="/admin/delete_npc.html?npcid=${response.data[i].npcid}">
                    <button id="submitBtn" type="button">Delete</button>
                </a>

                </div>
            `
        }
    })
    // error
    .catch((error) => {
        console.log(error)
    });
};