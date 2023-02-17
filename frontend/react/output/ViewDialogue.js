/////////////////////////////////////////////////////////////////////
//Linking to Dialogue URL
/////////////////////////////////////////////////////////////////////
API_URL = API_URL + '/dialogues';

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import AdminHeader from "./components/AdminHeader.js";
import RetrieveDialogueById from "./components/RetrieveDialogueById.js"; /////////////////////////////////////////////////////////////////////
//Getting dialogue id from the URL
/////////////////////////////////////////////////////////////////////
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let getDialogueId = urlParams.get('dialogueid');
const ViewDialogue = () => {
  const [dialogue, setDialogue] = React.useState([]);
  const [dialogueId, setDialogueId] = React.useState([]);
  React.useEffect(() => {
    // axios get request for dialogue data   
    axios.get(API_URL + `/${getDialogueId}`, {})

    // response successful
    .then(response => {
      // console.log(response.data);
      setDialogue(response.data);

      // console.log(response.data[0].dialogueid)
      setDialogueId(response.data[0].dialogueid);
    })

    // error
    .catch(error => {
      if (error.response.status == 400) {
        alert(`Error: Dialogue Id ${getDialogueId} does not exist.`);
      }
      console.log(error);
    });
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AdminHeader, {
    pageTitle: "Dialogue ID: " + dialogueId,
    backURL: "../../admin/react_manage_dialogues.html"
  }), /*#__PURE__*/React.createElement(RetrieveDialogueById, {
    dialogue: dialogue
  }));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(ViewDialogue, null));