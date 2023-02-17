// IMAGE_URL = IMAGE_URL + '/images/';

export default function RetrieveNpcs(props) {

    return (
        <div id="contentBody">
            {props.npcs.map((response) => {
                return (
                    <a href={"/admin/react_view_npc.html?npcid=" + response.npcid} className="card">
                        <img className="image" src={IMAGE_URL + response.imageurl} width="130px" height="130px"/>
                            <div className="textContainer">
                                <h3 className="mainText">{response.npcname}</h3>
                                <h3 className="subText">NPC ID: {response.npcid}</h3>
                                <h3 className="subText">Image ID: {response.imageid}</h3>
                                <h3 className="subText">Floor ID: {response.floorid}</h3>
                            </div>
                    </a>
                )
            })}
        </div>
    )
}