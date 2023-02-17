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
    axios.get(USER_URL + 'join/' + props.userid, {}).then(user => {
      localStorage.setItem('floorid', user.data.floorid);
      setUserImageUrl(user.data.userimageurl);
      setUserName(user.data.username);
    }).catch(err => {
      console.log(err);
      alert(err);
    });
    axios.get(NPC_URL + `/${getNpcId}/${userId}`, {}).then(npc => {
      console.log(npc.data[0].imageurl);
      setNpcImageUrl(npc.data[0].imageurl);
      setNpcName(npc.data[0].npcname);
    }).catch(err => {
      console.log(err);
      alert(err);
    });
  }, [props.symbol]);
  return /*#__PURE__*/React.createElement("div", {
    id: "flexContainer"
  }, !props.winner && /*#__PURE__*/React.createElement(React.Fragment, null, props.symbol === props.turn ? /*#__PURE__*/React.createElement("div", {
    id: "picSect"
  }, /*#__PURE__*/React.createElement("h2", {
    id: "playerName"
  }, userName), /*#__PURE__*/React.createElement("img", {
    src: IMAGE_URL + userImageUrl,
    id: "player"
  })) : /*#__PURE__*/React.createElement("div", {
    id: "picSect"
  }, /*#__PURE__*/React.createElement("h2", {
    id: "playerName"
  }, npcName), /*#__PURE__*/React.createElement("img", {
    src: IMAGE_URL + npcImageUrl,
    id: "player"
  }))));
}