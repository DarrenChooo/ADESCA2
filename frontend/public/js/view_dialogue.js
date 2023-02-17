/// //////////////////////////////////////////////////////////////////
// Linking to NPCs
/// //////////////////////////////////////////////////////////////////
API_URL += '/dialogues';

/// //////////////////////////////////////////////////////////////////
// Initalize Constant to store DOM Elements
/// //////////////////////////////////////////////////////////////////
const content = document.getElementById('contentBody');
const headerTitle = document.getElementById('adminTitle');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const getDialogueId = urlParams.get('dialogueid');

window.onload = () => {
    axios.get(`${API_URL  }/${getDialogueId}`, {})
    .then(function (response) {
        console.log(response.data[0].dialogueid)
        headerTitle.innerHTML = `Dialogue ID: ${response.data[0].dialogueid}`

        for (let i = 0; i < response.data.length; i++) {
            console.log(response.data[i]);
            content.innerHTML = `
                <div class = "textContainer">
                    <h2 class="subText">Dialogue Description:</h2>
                    <h3> ${response.data[i].dialoguedesc}</h3>
                    <h3 class="subText">NPC ID: ${response.data[i].npcid}</h3>
                </div>
                
                <div class="btnCtn">
                <a href="/admin/update_dialogue.html?dialogueid=${response.data[i].dialogueid}">
                    <button id="submitBtn" type="button">Update</button>
                </a>

                <a href="/admin/delete_dialogue.html?dialogueid=${response.data[i].dialogueid}">
                    <button id="submitBtn" type="button">Delete</button>
                </a>

                </div>
            `
        }
    })
    .catch((error) => {
        console.log(error)
    });
};