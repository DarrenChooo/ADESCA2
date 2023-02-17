/// //////////////////////////////////////////////////////////////////
// Linking to dialogue
/// //////////////////////////////////////////////////////////////////
API_URL += '/dialogues';

// For INSERT dialogue section 
const addDialogueButton = document.getElementById('submitBtn');
const insertdialogueInput = document.getElementById('dialogueDescIpt');
const insertNpcIdInput = document.getElementById('npcIdIpt');
const plotIdInput = document.getElementById('plotIdIpt');
const stateIdInput = document.getElementById('stateIdIpt');

/// //////////////////////////////////////////////////////////////////
// Function to INSERT dialogue
/// //////////////////////////////////////////////////////////////////
addDialogueButton.onclick = () => {
    const iDialogueDesc = insertdialogueInput.value;
    const iNpcId = insertNpcIdInput.value;
    const iPlotId = plotIdInput.value;
    const iStateId = stateIdInput.value;

    // send axios request to insert dialogue
    axios.post(`${API_URL  }/${iNpcId}`, {
        dialogueDesc : iDialogueDesc, 
        plotId : iPlotId, 
        stateId : iStateId
    })
    // request successful
    .then((response) => {
        console.log(response.data);
        alert(`New Dialogue has been assigned to NPC ID ${iNpcId}!`);
        window.location.href = "/admin/manage_dialogues.html";
    })
    // error
    .catch((error) => {
        console.log(error);
        alert(error);
    })
}