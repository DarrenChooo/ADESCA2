import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import ItemsHeader from "./components/ItemsHeader.js";
import RetrieveStoreItem from "./components/RetrieveStoreItem.js";
function StoreItem() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ItemsHeader, {
    backURL: "react_store.html",
    title: "Stardust Store"
  }), /*#__PURE__*/React.createElement(RetrieveStoreItem, null));
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(StoreItem, null));