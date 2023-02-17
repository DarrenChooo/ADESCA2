/// //////////////////////////////////////////////////////////////////
// Linking to NPCs
/// //////////////////////////////////////////////////////////////////
API_URL += '/npcs';

// For INSERT NPC section 
const addNpcButton = document.getElementById('submitBtn');
const insertNameInput = document.getElementById('npcNameIpt');
const insertImageIdInput = document.getElementById('imageIdIpt');
const insertFloorIdInput = document.getElementById('floorIdIpt');

/// //////////////////////////////////////////////////////////////////
// Function to INSERT NPC
/// //////////////////////////////////////////////////////////////////
addNpcButton.onclick = () => {
    const iNpcName =  insertNameInput.value;
    const iImageId = insertImageIdInput.value;
    const iFloorId = insertFloorIdInput.value;
    console.log("response.data");

    // send axios request to insert npc
    axios.post(API_URL, {
        npcName : iNpcName, 
        imageId: iImageId,
        floorId: iFloorId,
    })
    // response successful
    .then((response) => {
        console.log(response.data);
        alert(`New NPC - ${iNpcName}, of NPC ID ${response.data[0].npcid}, has been created!`);
        window.location.href = "/admin/manage_npcs.html";
    })
    // error
    .catch((error) => {
        console.log(error);
        alert(error);
    })
}