import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import AdminNavBar from "./components/AdminNavBar.js";
import AdminSearchBar from "./components/AdminSearchBar.js";
import RetrieveItems from "./components/RetrieveItems.js";
API_URL = API_URL + "/items/";
IMAGE_URL = IMAGE_URL + "/images/";
function ManageItems() {
  const [items, setItems] = React.useState([]);
  React.useEffect(function () {
    axios.get(API_URL).then(function (response) {
      setItems(response.data);
    }).catch(error => {
      console.log(error);
    });
    searchInput.addEventListener("keypress", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        axios.get(API_URL + `search/${searchInput.value}`).then(function (response) {
          setItems(response.data);
        }).catch(error => {
          console.log(error);
        });
      }
    });
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AdminNavBar, {
    pageTitle: "Items Manager"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bodyContainer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flexContainer"
  }, /*#__PURE__*/React.createElement(AdminSearchBar, {
    addURL: "react_add_item.html",
    placeholder: "Search Items"
  }), /*#__PURE__*/React.createElement(RetrieveItems, {
    items: items
  }))), /*#__PURE__*/React.createElement("br", null));
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(ManageItems, null));