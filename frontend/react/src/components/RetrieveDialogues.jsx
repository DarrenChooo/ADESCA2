export default function RetrieveDialogues(props) {

    return (
        <div id="contentBody">
            {props.dialogues.map((response) => {
                return (

                    <a href={"/admin/react_view_dialogue.html?dialogueid=" + response.dialogueid} className="card">
                        <div className="textContainer">
                            <h3 className="mainText">Dialogue ID: {response.dialogueid}</h3>
                            <h3 className="subText">Dialogue Description: {response.dialoguedesc}</h3>
                            <h3 className="subText">NPC ID: {response.npcid}</h3>
                        </div>
                    </a>

                )
            })}
        </div>
    )
}


