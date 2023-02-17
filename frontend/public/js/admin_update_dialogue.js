/// //////////////////////////////////////////////////////////////////
// Linking to Dialogues
/// //////////////////////////////////////////////////////////////////
API_URL += '/dialogues';

// For UPDATE dialogue section
const updateDialogueButton = document.getElementById('submitBtn');
const updateIdInput = document.getElementById('dialogueIdIpt');
const updateDialogueInput = document.getElementById('dialogueDescIpt');
const updateNpcIdInput = document.getElementById('npcIdIpt');
const plotIdInput = document.getElementById('plotIdIpt');
const stateIdInput = document.getElementById('stateIdIpt');

/// //////////////////////////////////////////////////////////////////
// Function to UPDATE dialogue
/// //////////////////////////////////////////////////////////////////
updateDialogueButton.onclick = () => {
    const uDialogueId = updateIdInput.value;
    const uDialogueDesc = updateDialogueInput.value;
    const uNpcId = updateNpcIdInput.value;
    const uPlotId = plotIdInput.value;
    const uStateId = stateIdInput.value;

    // send axios request to update dialogue
    axios.put(`${API_URL  }/${uDialogueId}`, {
        dialogueDesc: uDialogueDesc,
        npcId: uNpcId,
        plotId: uPlotId, 
        stateId: uStateId
    })
    // response successful
    .then((response) => {
        console.log(response.data);
        alert(`Dialogue ${uDialogueId} for NPC no. ${uNpcId} has been updated!`);
        window.location.href = "/admin/manage_dialogues.html";
    })
    // error
    .catch((error) => {
        console.log(error);
        alert(error);
    })
}