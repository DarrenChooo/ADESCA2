IMAGE_URL = `${IMAGE_URL}/images/`;
const userid = localStorage.getItem("userid");
export default function RetrievePlayers({
  players,
  renderButton
}) {
  let playerStatus, subText;
  return /*#__PURE__*/React.createElement("div", {
    id: "playersContent"
  }, players.map(player => {
    checkTimeAway(player);
    return /*#__PURE__*/React.createElement("div", {
      className: "card",
      key: player.userid
    }, /*#__PURE__*/React.createElement("div", {
      className: "player-image"
    }, /*#__PURE__*/React.createElement("img", {
      className: "image",
      src: IMAGE_URL + player.imageurl
    }), /*#__PURE__*/React.createElement("div", {
      className: "player-status",
      id: playerStatus
    })), /*#__PURE__*/React.createElement("div", {
      className: "text-container"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "main-text"
    }, player.username), /*#__PURE__*/React.createElement("h3", {
      className: "sub-text"
    }, subText)), renderButton(player));
  }));
  function checkTimeAway(player) {
    // Get Current Time
    const currentTime = new Date().toISOString().split(".")[0];

    // Convert ISO Date into milliseconds
    const start = new Date(currentTime).getTime();
    const end = new Date(player.lastloggedin).getTime();

    // Get difference between current time and last logged in time
    const milliseconds = Math.abs(end - start).toString();
    const playerSeconds = parseInt(milliseconds / 1000);
    if (player.lastloggedin == "offline" && playerSeconds > 86400) {
      playerStatus = "offline";
      subText = `Last seen: ${Math.floor(playerSeconds / 86400)} days ago`;
    } else if (player.lastloggedin == null) {
      playerStatus = "offline";
      subText = "Last seen: unknown";
    } else if (player.lastloggedin == "offline" && playerSeconds < 86400) {
      playerStatus = "away";
      subText = `Last seen: ${Math.floor(playerSeconds / 3600)} hours ago`;
    } else {
      playerStatus = "online";
      subText = "Online";
    }
  }
}