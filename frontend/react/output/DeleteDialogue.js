/////////////////////////////////////////////////////////////////////
//Linking to dialogue URL
/////////////////////////////////////////////////////////////////////
API_URL = API_URL + '/dialogues';

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import AdminHeader from "./components/AdminHeader.js";
import DeleteDialogueContent from "./components/DeleteDialogueContent.js"; /////////////////////////////////////////////////////////////////////
//Getting dialogue id from the URL
/////////////////////////////////////////////////////////////////////
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let getDialogueId = urlParams.get('dialogueid');
const DeleteDialogue = () => {
  const [dialogue, setDialogue] = React.useState([]);
  const [dialogueId, setDialogueId] = React.useState([]);
  React.useEffect(() => {
    // console.log(getDialogueId)

    // axios get request for dialogue data   
    axios.get(API_URL + `/${getDialogueId}`, {})

    // response successful
    .then(response => {
      // console.log(response.data);
      setDialogue(response.data);
      setDialogueId(response.data[0].dialogueid);
    }).catch(error => {
      console.log(error);
    });
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AdminHeader, {
    pageTitle: "Delete Dialogue Confirmation",
    backURL: "../../admin/react_view_dialogue.html?npcid=" + getDialogueId
  }), /*#__PURE__*/React.createElement("h2", {
    id: "confirmation"
  }, "Are you sure you want to delete Dialogue ID ", dialogueId, " from the database?", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "This step is irreversible."), /*#__PURE__*/React.createElement(DeleteDialogueContent, {
    dialogue: dialogue
  }));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(DeleteDialogue, null));