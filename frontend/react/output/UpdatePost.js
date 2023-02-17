/////////////////////////////////////////////////////////////////////
//Linking to post URL
/////////////////////////////////////////////////////////////////////
API_URL = API_URL + '/posts/';

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import AdminHeader from "./components/AdminHeader.js";
import UpdatePostForm from "./components/UpdatePostForm.js";
const UpdatePost = () => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AdminHeader, {
    pageTitle: "Update Post",
    backURL: "../../admin/react_manage_posts.html"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flexCtn"
  }, /*#__PURE__*/React.createElement(UpdatePostForm, null))));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(UpdatePost, null));