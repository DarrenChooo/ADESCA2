/// //////////////////////////////////////////////////////////////////
// Linking to NPCs
/// //////////////////////////////////////////////////////////////////
API_URL += '/npcs';

// For UPDATE NPC section
const updateNpcButton = document.getElementById('submitBtn');
const updateIdInput = document.getElementById('npcIdIpt');
const updateNameInput = document.getElementById('npcNameIpt');
const updateImageIdInput = document.getElementById('imageIdIpt');
const updateFloorIdInput = document.getElementById('floorIdIpt');

/// //////////////////////////////////////////////////////////////////
// Function to UPDATE NPC
/// //////////////////////////////////////////////////////////////////
updateNpcButton.onclick = () => {
    // decalring constants
    const uNpcId = updateIdInput.value;
    const uNpcName = updateNameInput.value;
    const uImageId = updateImageIdInput.value;
    const uFloorId = updateFloorIdInput.value;

    // send axios request to insert npc
    axios.put(`${API_URL  }/${uNpcId}`, {
        npcName: uNpcName,
        imageId: uImageId,
        floorId: uFloorId,
    })
        .then((response) => {
            console.log(uFloorId);
            console.log(response.data);
            alert(`NPC ${uNpcId} - ${uNpcName} has been updated!`);
            window.location.href = "/admin/manage_npcs.html";
        })
        .catch((error) => {
            console.log(error);
            alert(error);
        })
}