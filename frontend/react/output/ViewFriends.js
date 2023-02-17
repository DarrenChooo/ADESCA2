import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import UserHeader from "./components/UserHeader.js";
import RetrievePlayers from "./components/RetrievePlayers.js";
API_URL = API_URL + "/users/";
const userid = localStorage.getItem("userid");
function ViewPlayers() {
  const [friends, setFriends] = React.useState([]);
  const [showMenu, setShowMenu] = React.useState([false, 0]);
  React.useEffect(function () {
    axios.get(API_URL + `friends/` + userid).then(function (response) {
      console.log(response.data);
      setFriends(response.data);
    }).catch(error => {
      console.log(error);
    });
  }, []);
  function renderButton(player) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "request-button"
    }, /*#__PURE__*/React.createElement("button", {
      className: "button",
      onClick: () => {
        handleRemoveFriend(player.userid, player.username);
      }
    }, "Remove Friend")), /*#__PURE__*/React.createElement("div", {
      className: "dropdown"
    }, /*#__PURE__*/React.createElement("button", {
      className: "dropdown-btn",
      onClick: () => setShowMenu([!showMenu[0], player.userid])
    }, "..."), showMenu[0] && player.userid == showMenu[1] && /*#__PURE__*/React.createElement("ul", {
      className: "dropdown-content"
    }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
      onClick: () => {
        handleBlockUserRequest(player.userid, player.username);
      }
    }, "Block User")))));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(UserHeader, {
    pageTitle: "View Friends"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bodyContainer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flexContainer"
  }, /*#__PURE__*/React.createElement(RetrievePlayers, {
    players: friends,
    renderButton: renderButton
  }))));
  function handleRemoveFriend(targetUserId, targetUserName) {
    // Axios request to remove friend from friends list
    axios.delete(API_URL + `friends/` + userid + `/` + targetUserId, {}).then(function () {
      alert(`Removed ${targetUserName} from friends list`);
      window.location.reload();
    }).catch(error => {
      console.log(error);
    });
  }
  function handleBlockUserRequest(targetUserId, targetUserName) {
    // Axios request to block other users
    axios.post(API_URL + `block/` + userid, {
      requesteduserid: targetUserId
    }).then(function () {
      alert(`${targetUserName} has been blocked`);
      window.location.reload();
    }).catch(error => {
      console.log(error);
    });
  }
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(ViewPlayers, null));