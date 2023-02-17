/////////////////////////////////////////////////////////////////////
//Getting npc id from the URL
/////////////////////////////////////////////////////////////////////
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let getNpcId = urlParams.get('npcid');

export default function DeleteNpcContent(props) {

    // function to send axios request using the inputs
    const deleteNpc = event => {
        event.preventDefault();

        // send axios request to delete npc
        axios.delete(API_URL + `/${getNpcId}`, {})
            //response successful
            .then((response) => {
                console.log(response.data);
                alert(`NPC has been deleted!`);
                window.location.href = "/admin/react_manage_npcs.html"
            })

            // error
            .catch((error) => {
                console.log(error);
                
            })
    }

    return (
        <div className="card">
            {props.npc.map((response) => {
                return (
                    <div id="contentBody">
                        <img className="image" src={IMAGE_URL + response.imageurl} width="100%" height="60%" />
                        <div className="textContainer">
                            <h3 className="subText">NPC ID: {response.npcid}</h3>
                            <h3 className="subText">Image ID: {response.imageid}</h3>
                            <h3 className="subText">Floor ID: {response.floorid}</h3>
                        </div>

                        <div className="btnCtn">
                            <a href={"/admin/react_view_npc.html?npcid=" + response.npcid}>
                                <button id="submitBtn" type="button">Cancel</button>
                            </a>

                            <button id="deleteNpc" onClick={deleteNpc} type="button">Delete</button>

                        </div>
                    </div>
                )
            })}


        </div>

    )
}
