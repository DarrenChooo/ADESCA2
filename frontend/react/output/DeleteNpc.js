/////////////////////////////////////////////////////////////////////
//Linking to NPC and Image URL
/////////////////////////////////////////////////////////////////////
API_URL = API_URL + '/npcs';
IMAGE_URL = IMAGE_URL + '/images/';

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import AdminHeader from "./components/AdminHeader.js";
import DeleteNpcContent from "./components/DeleteNpcContent.js"; /////////////////////////////////////////////////////////////////////
//Getting npc id from the URL
/////////////////////////////////////////////////////////////////////
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let getNpcId = urlParams.get('npcid');
const DeleteNpc = () => {
  const [npc, setNpc] = React.useState([]);
  const [npcName, setNpcName] = React.useState([]);
  React.useEffect(() => {
    // console.log(getNpcId)

    // axios get request for NPC data   
    axios.get(API_URL + `/${getNpcId}`, {})

    // response successful
    .then(response => {
      // console.log(response.data);
      setNpc(response.data);
      setNpcName(response.data[0].npcname);
    }).catch(error => {
      console.log(error);
    });
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AdminHeader, {
    pageTitle: "Delete NPC Confirmation",
    backURL: "../../admin/react_view_npc.html?npcid=" + getNpcId
  }), /*#__PURE__*/React.createElement("h2", {
    id: "confirmation"
  }, "Are you sure you want to delete ", npcName, " from the database?", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "This step is irreversible."), /*#__PURE__*/React.createElement(DeleteNpcContent, {
    npc: npc
  }));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(DeleteNpc, null));