/////////////////////////////////////////////////////////////////////
//Linking to dialogues URL
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
import UpdateDialogueForm from "./components/UpdateDialogueForm.js";
const UpdateDialogue = () => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AdminHeader, {
    pageTitle: "Update Dialogue",
    backURL: "../../admin/react_manage_dialogues.html"
  }), /*#__PURE__*/React.createElement(UpdateDialogueForm, null));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(UpdateDialogue, null));