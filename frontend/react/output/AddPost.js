/////////////////////////////////////////////////////////////////////
//Linking to Post and Image URL
/////////////////////////////////////////////////////////////////////
API_URL = API_URL + '/posts/';
IMAGE_URL = IMAGE_URL + '/images/';

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import AdminHeader from "./components/AdminHeader.js";
import AddPostForm from "./components/AddPostForm.js";
const AddPost = () => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AdminHeader, {
    pageTitle: "Add Post",
    backURL: "../../user/user_manage_post.html"
  }), /*#__PURE__*/React.createElement(AddPostForm, null));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(AddPost, null));