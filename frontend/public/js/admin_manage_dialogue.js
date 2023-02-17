/// //////////////////////////////////////////////////////////////////
// Linking to dialogue
/// //////////////////////////////////////////////////////////////////
API_URL += '/dialogues';

/// //////////////////////////////////////////////////////////////////
// Initalize Constant to store DOM Elements
/// //////////////////////////////////////////////////////////////////
// For GET all dialogues section
const getAllDialogueButton = document.getElementById('getAllDialogue');
const getAllDialogueTable = document.getElementById('getAllDialogueTable');
const content = document.getElementById('contentBody');

const pagination = window.location.search.split('=')[1]
console.log(pagination)

window.onload = () => {

    // send axios request to get all dialogue via pagination
    axios.get(`${API_URL  }/page/${pagination}`, {})
    .then(function (response) {
        for (let i = 0; i < response.data.length; i++) {
            console.log(response.data[i]);
            content.innerHTML += `
            <a href="/admin/view_dialogue.html?dialogueid=${response.data[i].dialogueid}" class="card">
                <div class = "textContainer">
                    <h3 class="mainText">Dialogue ID: ${response.data[i].dialogueid}</h3>
                    <h3 class="subText">Dialogue Description: ${response.data[i].dialoguedesc}</h3>
                    <h3 class="subText">NPC ID: ${response.data[i].npcid}</h3>
                </div>
            </a>
            `
        }
    })
    .catch((error) => {
        console.log(error)
    });
};

searchInput.addEventListener('keypress', event => {
    if (event.key === "Enter") {

        axios.get(`${API_URL  }/search/${searchInput.value}`)
        .then(function (response) {

            content.innerHTML = ``

            for (i=0; i < response.data.rows.length; i++){

                content.innerHTML += `<a href="/admin/update_dialogue.html?dialogueid=${response.data.rows[i].dialogueid}" class="card">

                    <div class = "textContainer">
                    <h2 class="subText">Dialogue Description:</h2>
                    <h3> ${response.data.rows[i].dialoguedesc}</h3>
                    <h3 class="subText">NPC ID: ${response.data.rows[i].npcid}</h3>
                    <h3 class="subText">Plot ID: ${response.data.rows[i].plotid}</h3>
                    <h3 class="subText">State ID: ${response.data.rows[i].stateid}</h3>
                    </div>
                </a>
                `
            }
        })
        .catch((error) => {
            console.log(error)
            alert("Dialogue not found!")
        });
    }

})