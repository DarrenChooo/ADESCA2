/////////////////////////////////////////////////////////////////////
//Getting npc id from the URL
/////////////////////////////////////////////////////////////////////
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let getNpcId = urlParams.get('npcid');

export default function UpdateNpcForm(props) {
    const [npcName, setNpcName] = React.useState("");
    const [imageId, setImageId] = React.useState("");
    const [floorId, setFloorId] = React.useState("");
    const [npcId, setNpcId] = React.useState("");

    React.useEffect(() => {
        // axios get request for dialogue data   
        axios.get(API_URL + `/${getNpcId}`, {})

            // response successful
            .then((response) => {
                // console.log(response.data[0].dialogueid)
                setNpcName(response.data[0].npcname);
                setImageId(response.data[0].imageid);
                setFloorId(response.data[0].floorid);
                setNpcId(response.data[0].npcid);
            })

            // error
            .catch((error) => {
                if (error.response.status == 500) {
                    alert(`Error: Npc Id ${getNpcId} does not exist.`)
                }
                console.log(error)
            });
    }, [])

    // function to update state of npcName using setNpcName when the input is updated in the input element
    const handleNpcNameInput = event => {

        // update npcName
        setNpcName(event.target.value)
        console.log("NPC Name:" + npcName);
    }

    // function to update state of imageId using setimageId when the input is updated in the input element
    const handleImageIdInput = event => {

        // update imageId
        setImageId(event.target.value)
        console.log("Image Id:" + imageId);
    }

    // function to update state of floorId using setfloorId when the input is updated in the input element
    const handleFloorIdInput = event => {

        // update floorId
        setFloorId(event.target.value)
        console.log("Floor Id:" + floorId);
    }

    // function to update state of floorId using setfloorId when the input is updated in the input element
    const handleNpcIdInput = event => {

        // update floorId
        setNpcId(event.target.value)
        console.log("NPC Id:" + npcId);
    }

    // function to send axios request using the inputs
    const handleSubmitForm = event => {
        event.preventDefault();
        console.log("NPC Name:" + npcName);
        console.log("Image Id:" + imageId);
        console.log("Floor Id:" + floorId);
        console.log("NPC Id:" + npcId);

        // send axios request to update npc
        axios.put(API_URL + `/${getNpcId}`, {
            npcName: npcName,
            imageId: imageId,
            floorId: floorId,
            npcId: npcId
        })
            // response successful
            .then((response) => {
                // console.log(floorId);
                console.log(response.data);
                alert(`NPC ${npcId} - ${npcName} has been updated!`);
                window.location.href = "/admin/react_manage_npcs.html";
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
                        <input onChange={handleNpcNameInput} type="text" id="npcNameIpt" placeholder="Eg: Clyde" value={npcName} />
                        <label className="inputLabel">NPC Name</label>
                    </div>
                    <div className="input">
                        <input onChange={handleImageIdInput} type="text" id="imageIdIpt" placeholder="Eg: 4" value={imageId} />
                        <label className="inputLabel">Image ID</label>
                    </div>
                    <div className="input">
                        <input onChange={handleFloorIdInput} type="text" id="floorIdIpt" placeholder="Eg: 1" value={floorId} />
                        <label className="inputLabel">Floor ID</label>
                    </div>
                    <div className="input">
                        <input onChange={handleNpcIdInput} type="text" id="npcIdIpt" placeholder="Eg: 25" value={npcId} />
                        <label className="inputLabel">NPC ID</label>
                    </div>
                    <div className="btnCtn">
                        <button id="submitBtn" type="submit">Submit</button>
                    </div>
                </form>

            </div>
        </div>

    )
}