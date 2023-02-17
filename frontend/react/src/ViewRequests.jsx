import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import UserHeader from "./components/UserHeader";
import RetrievePlayers from "./components/RetrievePlayers";

API_URL = API_URL + "/users/";
const userid = localStorage.getItem("userid");

function ViewRequests() {
  const [players, setPlayers] = React.useState([]);
  const [showMenu, setShowMenu] = React.useState([false, 0]);

  React.useEffect(function () {
    axios
      .get(API_URL + `requests/` + userid)
      .then(function (response) {
        console.log(response.data);
        setPlayers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function renderButton(player) {
    return (
      <>
        <div className="request-button">
          <button
            className="button"
            onClick={() => {
              handleAcceptFriendRequest(player.userid, player.username);
            }}
          >
            Accept friend request
          </button>
        </div>
        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => setShowMenu([!showMenu[0], player.userid])}
          >
            ...
          </button>
          {showMenu[0] && player.userid == showMenu[1] && (
            <ul className="dropdown-content">
              <li>
                <a
                  onClick={() => {
                    handleBlockUserRequest(player.userid, player.username);
                  }}
                >
                  Block User
                </a>
              </li>
            </ul>
          )}
        </div>
      </>
    );
  }

  return (
    <div>
      <UserHeader pageTitle="View Friend Requests" />
      <div className="bodyContainer">
        <div className="flexContainer">
          <RetrievePlayers players={players} renderButton={renderButton} />
        </div>
      </div>
    </div>
  );

  function handleAcceptFriendRequest(targetUserId, targetUserName) {
    // Axios request to accept friend request from others
    axios
      .put(API_URL + `friends/` + userid, {
        requesteruserid: targetUserId,
      })
      .then(function () {
        alert(`Friend request by ${targetUserName} has been accepted`);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleBlockUserRequest(targetUserId, targetUserName) {
    // Axios request to block other users
    axios
    .post(API_URL + `block/` + userid, {
      requesteduserid: targetUserId,
    })
    .then(function () {
      alert(`${targetUserName} has been blocked`);
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
 }
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ViewRequests />);
