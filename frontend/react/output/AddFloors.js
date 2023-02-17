/////////////////////////////////////////////////////////////////////
//Linking to Floors and Image URL
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
import AddFloorForm from "./components/AddFloorForm.js";
import ErrorPage from "./components/ErrorPage.js";
const AddFloors = () => {
  // For error handling
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [errorData, setErrorData] = React.useState("");
  return /*#__PURE__*/React.createElement(React.Fragment, null, error ? /*#__PURE__*/React.createElement(ErrorPage, {
    setErrorMessage: errorMessage,
    setErrorData: errorData
  }) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AdminHeader, {
    pageTitle: "Add Floor",
    backURL: "../../admin/react_manage_floors.html"
  }), /*#__PURE__*/React.createElement(AddFloorForm, {
    setError: setError,
    setErrorMessage: setErrorMessage,
    setErrorData: setErrorData
  })));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(AddFloors, null));