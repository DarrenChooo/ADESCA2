import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import AdminNavBar from "./components/AdminNavBar.js";
import UpdateBossCard from "./components/UpdateBossCard.js";
API_URL = `${API_URL}/boss/`;
IMAGE_URL = `${IMAGE_URL}/images/`;
function ManageBoss() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AdminNavBar, {
    pageTitle: "Boss Manager"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bodyContainer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flexContainer"
  }, /*#__PURE__*/React.createElement(UpdateBossCard, null))));
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(ManageBoss, null));