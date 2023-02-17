export default function AddDialogueForm(props) {
    const [dialogueDesc, setDialogueDesc] = React.useState("");
    const [npcId, setNpcId] = React.useState("");
    const [plotId, setPlotId] = React.useState("");
    const [stateId, setStateId] = React.useState("");

    // function to update state of dialogueDesc using setDialogueDesc when the input is updated in the input element
    const handleDialogueDescInput = event => {

        // update dialogueDesc
        setDialogueDesc(event.target.value)
        console.log("Dialogue Desc: " + dialogueDesc);
    }

    // function to update state of npcId using setNpcId when the input is updated in the input element
    const handleNpcIdInput = event => {

        // update npcId
        setNpcId(event.target.value)
        console.log("NPC Id: " + npcId);
    }

    // function to update state of plotId using setPlotId when the input is updated in the input element
    const handlePlotIdInput = event => {

        // update PlotId
        setPlotId(event.target.value)
        console.log("Plot Id: " + plotId);
    }

    // function to update state of stateId using setStateId when the input is updated in the input element
    const handleStateIdInput = event => {

        // update stateId
        setStateId(event.target.value)
        console.log("State Id: " + stateId);
    }

    // function to send axios request using the inputs
    const handleSubmitForm = event => {
        event.preventDefault();
        console.log("Dialogue Desc: " + dialogueDesc);
        console.log("NPC Id: " + npcId);
        console.log("Plot Id: " + plotId);
        console.log("State Id: " + stateId);

        // send axios request to insert dialogue
        axios.post(API_URL + `/${npcId}`, {
            dialogueDesc: dialogueDesc,
            plotId: plotId,
            stateId: stateId
        })
            // request successful
            .then((response) => {
                console.log(response.data);
                alert(`New Dialogue has been assigned to NPC ID ${npcId}!`);
                window.location.href = "/admin/react_manage_dialogues.html";
            })

            // error response
            .catch((error) => {
                console.log(error);
                alert(error);
            })

    }

    return (
        <div className="card">
            <div className="dataCtn">
                <form onSubmit={handleSubmitForm}>
                    <div className="input">
                        <input type="text" id="dialogueDescIpt" placeholder="Eg: Welcome to Stardust Neverland!" onChange={handleDialogueDescInput} />
                        <label className="inputLabel">Dialogue Description</label>
                    </div>
                    <div className="input">
                        <input type="text" id="npcIdIpt" placeholder="Eg: 22" onChange={handleNpcIdInput} />
                        <label className="inputLabel">NPC ID</label>
                    </div>
                    <div className="input">
                        <input type="text" id="plotIdIpt" placeholder="Eg: 1" onChange={handlePlotIdInput} />
                        <label className="inputLabel">Plot ID</label>
                    </div>
                    <div className="input">
                        <input type="text" id="stateIdIpt" placeholder="Eg: 1" onChange={handleStateIdInput} />
                        <label className="inputLabel">State ID</label>
                    </div>
                    <div className="btnCtn">
                        <button id="submitBtn" type="submit">Submit</button>
                    </div>
                </form>

            </div>
        </div>
    )
}