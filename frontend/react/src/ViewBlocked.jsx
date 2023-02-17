import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import UserHeader from "./components/UserHeader";
import RetrievePlayers from "./components/RetrievePlayers";

API_URL = API_URL + "/users/";
const userid = localStorage.getItem("userid");

function ViewBlocked() {
  const [blocked, setBlocked] = React.useState([]);
  React.useEffect(function () {
    axios
      .get(API_URL + `block/` + userid)
      .then(function (response) {
        console.log(response.data);
        setBlocked(response.data);
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
                handleUnblock(player.userid, player.username);
            }}
          >
            Unblock Player
          </button>
        </div>
      </>
    );
  }

  return (
    <div>
      <UserHeader pageTitle="View Blocked Players" />
      <div className="bodyContainer">
        <div className="flexContainer">
          <RetrievePlayers players={blocked} renderButton={renderButton} />
        </div>
      </div>
    </div>
  );

  function handleUnblock(targetUserId, targetUserName) {
    // Axios request to unblock user
    axios
      .delete(API_URL + `block/` + userid + `/` + targetUserId, {})
      .then(function () {
        alert(`Unblocked ${targetUserName}`);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ViewBlocked />);
