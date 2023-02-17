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
import AdminHeader from "./components/AdminHeader.js";
import RetrieveNpcById from "./components/RetrieveNpcById.js"; /////////////////////////////////////////////////////////////////////
//Getting npc id from the URL
/////////////////////////////////////////////////////////////////////
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let getNpcId = urlParams.get('npcid');
const ViewNpc = () => {
  const [npc, setNpc] = React.useState([]);
  const [npcName, setNpcName] = React.useState([]);
  React.useEffect(() => {
    // axios get request for NPC data   
    axios.get(API_URL + `/${getNpcId}/0`, {})

    // response successful
    .then(response => {
      // console.log(response.data);
      setNpc(response.data);
      // console.log(npc[0].npcname)
      setNpcName(response.data[0].npcname);
    })

    // error
    .catch(error => {
      if (error.response.status == 500) {
        alert(`Error: Npc Id ${getNpcId} does not exist.`);
      }
      console.log(error);
    });
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AdminHeader, {
    pageTitle: "NPC Name: " + npcName,
    backURL: "../../admin/react_manage_npcs.html"
  }), /*#__PURE__*/React.createElement(RetrieveNpcById, {
    npc: npc
  }));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(ViewNpc, null));