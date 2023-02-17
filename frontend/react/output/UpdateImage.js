import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import AdminHeader from "./components/AdminHeader.js";
import UpdateImageCard from "./components/UpdateImageCard.js";
API_URL = `${API_URL}/image/`;
IMAGE_URL = `${IMAGE_URL}/images/`;
let imageid = window.location.search.split("=")[1];
function UpdateImage() {
  const [image, setImage] = React.useState([]);
  const [pageTitle, setPageTitle] = React.useState([]);
  React.useEffect(function () {
    axios.get(API_URL + imageid).then(function (response) {
      setImage(response.data);
      setPageTitle(response.data.imagename);
    }).catch(error => {
      console.log(error);
    });
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AdminHeader, {
    pageTitle: pageTitle,
    backURL: "react_manage_images.html"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bodyContainer"
  }, /*#__PURE__*/React.createElement("div", {
    id: "imageContent"
  }, /*#__PURE__*/React.createElement(UpdateImageCard, {
    image: image
  }))));
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(UpdateImage, null));