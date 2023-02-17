/////////////////////////////////////////////////////////////////////
//Getting dialogue id from the URL
/////////////////////////////////////////////////////////////////////
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let getDialogueId = urlParams.get('dialogueid');

export default function DeleteDialogueContent(props) {

    // function to send axios request using the inputs
    const deleteDialogue = event => {
        event.preventDefault();

        // send axios request to delete dialogue
        axios.delete(API_URL + `/${getDialogueId}`, {})
            //response successful
            .then((response) => {
                console.log(response.data);
                alert(`Dialogue has been deleted!`);
                window.location.href = "/admin/react_manage_dialogues.html"
            })

            // error
            .catch((error) => {
                console.log(error);

            })
    }

    return (

        <div className="card">
            {props.dialogue.map((response) => {
                return (
                    <div id="contentBody">

                        <div className="textContainer">
                            <h3 className="subText">Dialogue ID: {response.dialogueid}</h3>
                            <h3 className="subText">Dialogue Description: {response.dialoguedesc}</h3>
                            <h3 className="subText">NPC ID: {response.npcid}</h3>
                        </div>

                        <div className="btnCtn">
                            <a href={"/admin/react_view_dialogue.html?dialogueid=" + response.dialogueid}>
                                <button id="submitBtn" type="button">Cancel</button>
                            </a>

                            <button id="deleteDialogue" onClick={deleteDialogue} type="button">Delete</button>

                        </div>

                    </div>
                )
            })}

        </div>

    )
}
