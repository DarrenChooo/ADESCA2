/// //////////////////////////////////////////////////////////////////
// Linking to Dialogues
/// //////////////////////////////////////////////////////////////////
API_URL += '/dialogues';

/// //////////////////////////////////////////////////////////////////
// Initalize Constant to store DOM Elements
/// //////////////////////////////////////////////////////////////////
const content = document.getElementById('contentBody');
const headerTitle = document.getElementById('adminTitle');
const confirmation = document.getElementById('confirmation');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const getDialogueId = urlParams.get('dialogueid');

// execute axios request once window is being loaded without trigger events
window.onload = () => {
    // send axios request to get dialogue by id
    axios.get(`${API_URL  }/${getDialogueId}`, {})
        // response successful
        .then(function (response) {
            console.log(response.data[0].dialogueid)
            confirmation.innerHTML += `
            Are you sure you want to delete Dialogue ID ${response.data[0].dialogueid} from the database? 
            <br><br>
            This step is irreversible. 
            `
            if (!response || !response.data || response.data.length === 0) {
                // Handle error

                alert("Dialogue Not Found")
                window.location.href = "/admin/manage_dialogues.html";

            } else {
                content.innerHTML = `
                <div class = "textContainer">
                    <h3 class="subText">Dialogue ID: ${response.data[0].dialogueid}</h3>
                    <h3 class="subText">Dialogue Description: ${response.data[0].dialoguedesc}</h3>
                    <h3 class="subText">NPC ID: ${response.data[0].npcid}</h3>
                </div>
                
                <div class="btnCtn">
                <a href="/admin/view_dialogue.html?dialogueid=${response.data[0].dialogueid}">
                    <button id="submitBtn" type="button">Cancel</button>
                </a>

                <button id="deleteDialogue" onclick="deleteDialogue" type="button">Delete</button>

                </div>
            `
                const deleteDialogueButton = document.getElementById('deleteDialogue');

                deleteDialogueButton.onclick = () => {

                    // send axios request to delete dialogue
                    axios.delete(`${API_URL  }/${getDialogueId}`, {})
                        .then((response) => {
                            console.log(response.data);
                            alert(`Dialogue has been deleted!`);
                            window.location.href = "/admin/manage_dialogues.html";
                        })
                        .catch((error) => {
                            console.log(error);
                            alert(error);
                        })
                }
            }
        })
        .catch((error) => {
            console.log(error)
            alert("Dialogue Not Found")
            window.location.href = "/admin/manage_dialogues.html"
        });
};



