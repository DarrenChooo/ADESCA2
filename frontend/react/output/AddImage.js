import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import AdminHeader from "./components/AdminHeader.js";
import AddImageForm from "./components/AddImageForm.js";
API_URL = `${API_URL}/image/`;
function AddImage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AdminHeader, {
    pageTitle: "Upload Image",
    backURL: "react_manage_images.html"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bodyContainer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "textContainer"
  }, /*#__PURE__*/React.createElement(AddImageForm, null)))));
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(AddImage, null));