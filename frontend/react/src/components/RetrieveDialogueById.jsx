export default function RetrieveDialogueById(props) {

    return (
        <div className="card">
            {props.dialogue.map((response) => {
                return (

                    <div id="contentBody">

                        <div className="textContainer">
                            <h2 className="subText">Dialogue Description:</h2>
                            <h3> {response.dialoguedesc}</h3>
                            <h3 className="subText">NPC ID: {response.npcid}</h3>
                        </div>

                        <div className="btnCtn">
                            <a href={"/admin/react_update_dialogue.html?dialogueid=" + response.dialogueid}>
                                <button id="submitBtn" type="button">Update</button>
                            </a>

                            <a href={"/admin/react_delete_dialogue.html?dialogueid=" + response.dialogueid}>
                                <button id="submitBtn" type="button">Delete</button>
                            </a>

                        </div>

                    </div>

                )
            })}
        </div>
    )
}