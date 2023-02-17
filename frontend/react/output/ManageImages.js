import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import AdminNavBar from "./components/AdminNavBar.js";
import AdminSearchBar from "./components/AdminSearchBar.js";
import RetrieveImages from "./components/RetrieveImages.js";
import Pagination from "./components/Pagination.js";
let pagination = window.location.search.split("=")[1];
if (pagination === undefined) {
  pagination = 1;
}
function ManageImages() {
  const [images, setImages] = React.useState([]);
  const [pageCount, setPageCount] = React.useState([]);
  React.useEffect(function () {
    axios.get(API_URL + `page/` + pagination).then(function (response) {
      setImages(response.data[0]);
      setPageCount(Math.ceil(response.data[1][0].count / 12));
    }).catch(error => {
      console.log(error);
    });
    searchInput.addEventListener("keypress", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        axios.get(API_URL + `search/${searchInput.value}`).then(function (response) {
          setImages(response.data);
        }).catch(error => {
          console.log(error);
        });
      }
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AdminNavBar, {
    pageTitle: "Images Manager"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bodyContainer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flexContainer"
  }, /*#__PURE__*/React.createElement(AdminSearchBar, {
    addURL: "/admin/react_add_image.html",
    placeholder: "Search Images"
  }), /*#__PURE__*/React.createElement(RetrieveImages, {
    images: images,
    page: pagination
  }), /*#__PURE__*/React.createElement(Pagination, {
    page: pagination,
    pageCount: pageCount
  }))));
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(ManageImages, null));