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
import AddDialogueForm from "./components/AddDialogueForm.js";
const AddDialogue = () => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AdminHeader, {
    pageTitle: "Add Dialogue",
    backURL: "../../admin/react_manage_dialogues.html"
  }), /*#__PURE__*/React.createElement(AddDialogueForm, null));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(AddDialogue, null));