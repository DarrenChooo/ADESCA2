API_URL = API_URL + '/inventory/';
IMAGE_URL = IMAGE_URL + '/images/';
const user_id = localStorage.getItem('userid');
/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import InventoryHeader from "./components/InventoryHeader.js";
import RetrieveInventory from "./components/RetrieveInventory.js";
const Inventory = () => {
  //use state store value of inventory
  const [inventory, setInventory] = React.useState([]);
  //use effect to get all inventory
  React.useEffect(() => {
    // send axios request to get all inventory
    axios.get(API_URL + user_id, {})
    // response successful
    .then(body => {
      // console.log(body.data);
      setInventory(body.data);
    })
    // error response
    .catch(error => {
      console.log(error);
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InventoryHeader, {
    backURL: "/user/react_floor.html"
  }), /*#__PURE__*/React.createElement(RetrieveInventory, {
    inventory: inventory
  }));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(Inventory, null));