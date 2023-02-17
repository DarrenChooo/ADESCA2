//Linking to users
const USER_URL = API_URL + '/users/';

//Linking to Images
const IMAGES_URL = IMAGE_URL + '/images/';

//Assign elements to a constant
const userid = window.localStorage.getItem('userid');
export default function UserProfile({
  setPlayerUsername,
  setPlayerId,
  floorId,
  setFloorId,
  setUserImageUrl
}) {
  const [userData, setUserData] = React.useState({});
  React.useEffect(() => {
    axios({
      method: 'get',
      url: USER_URL + `join/${userid}`
    }).then(response => {
      if (floorId === null) {
        setFloorId(response.data.floorid);
        setUserImageUrl(response.data.userimageurl);
        setUserData(response.data);
        setPlayerUsername(response.data.username);
        setPlayerId(response.data.userid);
      } else {
        setUserImageUrl(response.data.userimageurl);
        setUserData(response.data);
        setPlayerUsername(response.data.username);
        setPlayerId(response.data.userid);
      }
    }).catch(error => {
      window.alert(`Failed to retrieve User's details`);
      console.log(error);
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    id: "profile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profileImage"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGES_URL + userData.userimageurl
  })), /*#__PURE__*/React.createElement("div", {
    className: "profileDetails"
  }, /*#__PURE__*/React.createElement("h3", null, "Profile: ", userData.username), /*#__PURE__*/React.createElement("h3", null, "StarDust: ", userData.quantity)));
}