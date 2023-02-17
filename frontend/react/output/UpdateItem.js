import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import AdminHeader from "./components/AdminHeader.js";
import UpdateItemCard from "./components/UpdateItemCard.js";
API_URL = API_URL + "/items/";
IMAGE_URL = IMAGE_URL + "/images/";
let itemid = window.location.search.split("=")[1];
function UpdateItem() {
  const [item, setItem] = React.useState([]);
  const [pageTitle, setPageTitle] = React.useState([]);
  React.useEffect(function () {
    axios.get(API_URL + itemid).then(function (response) {
      setItem(response.data);
      setPageTitle(response.data.itemname);
    }).catch(error => {
      console.log(error);
    });
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AdminHeader, {
    pageTitle: pageTitle,
    backURL: "react_manage_items.html"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bodyContainer"
  }, /*#__PURE__*/React.createElement("div", {
    id: "imageContent"
  }, /*#__PURE__*/React.createElement(UpdateItemCard, {
    item: item
  }))));
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(UpdateItem, null));