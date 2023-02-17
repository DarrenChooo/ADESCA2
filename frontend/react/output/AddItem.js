import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import AdminHeader from "./components/AdminHeader.js";
import AddItemForm from "./components/AddItemForm.js";
API_URL = `${API_URL}/items/`;
function AddItem() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AdminHeader, {
    pageTitle: "Upload Item",
    backURL: "react_manage_items.html"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bodyContainer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "textContainer"
  }, /*#__PURE__*/React.createElement(AddItemForm, null)))));
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(AddItem, null));