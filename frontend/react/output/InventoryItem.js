/////////////////////////////////////////////////////////////////////
//Linking to dialogue URL
/////////////////////////////////////////////////////////////////////
API_URL = API_URL + '/inventory/';
IMAGE_URL = IMAGE_URL + '/images/';

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import InventoryHeader from "./components/InventoryHeader.js";
import UpdateInventoryForm from "./components/UpdateInventoryForm.js";
const InventoryItem = () => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InventoryHeader, {
    backURL: "/user/react_inventory.html"
  }), /*#__PURE__*/React.createElement(UpdateInventoryForm, null));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(InventoryItem, null));