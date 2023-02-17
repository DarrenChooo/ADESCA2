/////////////////////////////////////////////////////////////////////
//Linking to NPC and Image URL
/////////////////////////////////////////////////////////////////////
API_URL = API_URL + '/npcs';
IMAGE_URL = IMAGE_URL + '/images/';

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import AdminNavBar from "./components/AdminNavBar.js";
import AdminSearchBar from "./components/AdminSearchBar.js";
import RetrieveNpcs from "./components/RetrieveNpcs.js";
const ManageNpcs = () => {
  const [npcs, setNpcs] = React.useState([]);
  React.useEffect(() => {
    // send axios request to get all npcs
    axios.get(API_URL, {})

    // response successful
    .then(response => {
      // console.log(response.data);
      setNpcs(response.data);
    }).catch(error => {
      console.log(error);
      alert(error);
    });

    // add event listener for search bar
    searchInput.addEventListener("keypress", event => {
      if (event.key === "Enter") {
        event.preventDefault();

        // send axios request to get all npcs that contains the keyword input
        axios.get(API_URL + `/search/${searchInput.value}`, {})

        // response successful
        .then(response => {
          // console.log(response.data.rows[0]);
          setNpcs(response.data.rows);
        }).catch(error => {
          console.log(error);
          alert(error);
        });
      }
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AdminNavBar, {
    pageTitle: "NPC Manager"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
    className: "bodyContainer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flexContainer"
  }, /*#__PURE__*/React.createElement(AdminSearchBar, {
    addURL: "/admin/react_add_npc.html"
  }), /*#__PURE__*/React.createElement(RetrieveNpcs, {
    npcs: npcs
  }))));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(ManageNpcs, null));