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
import AddNpcForm from "./components/AddNpcForm.js";
const AddNpc = () => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AdminHeader, {
    pageTitle: "Add NPC",
    backURL: "../../admin/react_manage_npcs.html"
  }), /*#__PURE__*/React.createElement(AddNpcForm, null));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(AddNpc, null));