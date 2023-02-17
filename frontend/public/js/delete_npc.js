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
const confirmation = document.getElementById('confirmation');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const getNpcId = urlParams.get('npcid');

window.onload = () => {
    // send axios request to get npc by id
    axios.get(`${API_URL  }/${getNpcId}`, {})
        .then(function (response) {
            console.log(response.data[0].npcname)
            confirmation.innerHTML += `
            Are you sure you want to delete ${response.data[0].npcname} from the database? 
            <br><br>
            This step is irreversible. 
            `

            if (!response || !response.data || response.data.length === 0) {
                // Handle error

                alert("NPC Not Found");
                window.location.href = "/admin/manage_npcs.html";

            } else {
                const npc = response.data[0];
                content.innerHTML = `

            <img class="image" src="${IMAGE_URL + npc.imageurl}" width="100%" height="60%">
                <div class = "textContainer">
                    <h3 class="subText">NPC ID: ${npc.npcid}</h3>
                    <h3 class="subText">Image ID: ${npc.imageid}</h3>
                    <h3 class="subText">Floor ID: ${npc.floorid}</h3>
                </div>
                
                <div class="btnCtn">
                <a href="/admin/view_npc.html?npcid=${npc.npcid}">
                    <button id="submitBtn" type="button">Cancel</button>
                </a>

                <button id="deleteNpc" onclick="deleteNpc" type="button">Delete</button>

                </div>
            `

                const deleteNpcButton = document.getElementById('deleteNpc');

                deleteNpcButton.onclick = () => {

                    // send axios request to delete npc
                    axios.delete(`${API_URL  }/${getNpcId}`, {})
                        // response successful
                        .then((response) => {
                            console.log(response.data);
                            alert(`NPC has been deleted!`);
                            window.location.href = "/admin/manage_npcs.html"
                        })
                        // error
                        .catch((error) => {
                            console.log(error);
                            alert(error);
                        })
                }
            }
        })
        // error
        .catch((error) => {
            console.log(error)
            alert("NPC Not Found")
            window.location.href = "/admin/manage_npcs.html"
        });
};



