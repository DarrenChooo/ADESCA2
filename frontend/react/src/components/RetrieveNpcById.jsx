export default function RetrieveNpcById(props) {

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
                            <a href={"/admin/react_update_npc.html?npcid=" + response.npcid}>
                                <button id="submitBtn" type="button">Update</button>
                            </a>

                            <a href={"/admin/react_delete_npc.html?npcid=" + response.npcid}>
                                <button id="submitBtn" type="button">Delete</button>
                            </a>

                        </div>
                    </div>

                )
            })}
        </div>
    )
}