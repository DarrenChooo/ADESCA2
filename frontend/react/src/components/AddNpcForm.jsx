export default function AddNpcForm(props) {
    const [npcName, setNpcName] = React.useState("");
    const [imageId, setimageId] = React.useState("");
    const [floorId, setfloorId] = React.useState("");

    // function to update state of npcName using setNpcName when the input is updated in the input element
    const handleNpcNameInput = event => {

        // update npcName
        setNpcName(event.target.value)
        console.log("NPC Name:" + npcName);
    }

    // function to update state of imageId using setimageId when the input is updated in the input element
    const handleImageIdInput = event => {

        // update imageId
        setimageId(event.target.value)
        console.log("Image Id:" + imageId);
    }

    // function to update state of floorId using setfloorId when the input is updated in the input element
    const handleFloorIdInput = event => {

        // update floorId
        setfloorId(event.target.value)
        console.log("Floor Id:" + floorId);
    }

    // function to send axios request using the inputs
    const handleSubmitForm = event => {
        event.preventDefault();
        console.log("NPC Name:" + npcName);
        console.log("Image Id:" + imageId);
        console.log("Floor Id:" + floorId);

        // send axios request to insert npc
        axios.post(API_URL, {
            npcName: npcName,
            imageId: imageId,
            floorId: floorId,
        })
            // response successful
            .then((response) => {
                console.log(response.data);
                alert(`New NPC - ${npcName}, of NPC ID ${response.data[0].npcid}, has been created!`);
                window.location.href = "/admin/react_manage_npcs.html";
            })

            // if error is caught
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }

    return (
        <div className="card">
            <div className="dataCtn">
                <form onSubmit={handleSubmitForm}>
                    <div className="input">
                        <input type="text" id="npcNameIpt" placeholder="Eg: Clyde" onChange={handleNpcNameInput} />
                        <label className="inputLabel">NPC Name</label>
                    </div>

                    <div className="input">
                        <input onChange={handleImageIdInput} type="text" id="imageIdIpt" placeholder="Eg: 4" />
                        <label className="inputLabel">Image ID</label>
                    </div>

                    <div className="input">
                        <input onChange={handleFloorIdInput} type="text" id="floorIdIpt" placeholder="Eg: 1" />
                        <label className="inputLabel">Floor ID</label>
                    </div>

                    <div className="btnCtn">
                        <button id="submitBtn" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}