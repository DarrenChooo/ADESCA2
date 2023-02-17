/////////////////////////////////////////////////////////////////////
//Linking to Floor and Image URL
/////////////////////////////////////////////////////////////////////
API_URL = API_URL + '/floors/';
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
import UpdateFloorsForm from "./components/UpdateFloorsForm.js";
const UpdateFloors = () => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AdminHeader, {
    pageTitle: "Update Floors",
    backURL: "../../admin/react_manage_floors.html"
  }), /*#__PURE__*/React.createElement(UpdateFloorsForm, null));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(UpdateFloors, null));