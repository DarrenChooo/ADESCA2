///////////////////////////////////////////////////////////////////
// Linking to npcs and users url
///////////////////////////////////////////////////////////////////
const NPC_URL = API_URL + '/npcs';
const USER_URL = API_URL + '/users/';

const getNpcId = localStorage.getItem('npcId');
const userId = localStorage.getItem('userid');

export default function TicTacToePlayerPic(props) {
    const [userImageUrl, setUserImageUrl] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [npcImageUrl, setNpcImageUrl] = React.useState("");
    const [npcName, setNpcName] = React.useState("");

    React.useEffect(() => {

        axios.get(USER_URL + 'join/' + props.userid, {})

            .then((user) => {
                localStorage.setItem('floorid', user.data.floorid)
                setUserImageUrl(user.data.userimageurl);
                setUserName(user.data.username)
            })

            .catch((err) => {
                console.log(err);
                alert(err);
            })

        axios.get(NPC_URL + `/${getNpcId}/${userId}`, {})

            .then((npc) => {
                console.log(npc.data[0].imageurl);
                setNpcImageUrl(npc.data[0].imageurl);
                setNpcName(npc.data[0].npcname)

            })

            .catch((err) => {
                console.log(err);
                alert(err);
            })

    }, [props.symbol])


    return (
        <div id="flexContainer">

            {!props.winner && (
                <>

                    {/* display who's turn if winner is not detected */}
                    {props.symbol === props.turn ? (
                        <div id="picSect">
                            <h2 id="playerName">{userName}</h2>
                            <img src={IMAGE_URL + userImageUrl} id="player"></img>
                        </div>

                    )
                        : (
                            <div id="picSect">
                                <h2 id="playerName">{npcName}</h2>
                                <img src={IMAGE_URL + npcImageUrl} id="player"></img>
                            </div>

                        )}

                </>

            )}

        </div>
    )

}