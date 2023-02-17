import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import AdminHeader from "./components/AdminHeader";
import UpdateImageCard from "./components/UpdateImageCard";

API_URL = `${API_URL}/image/`;
IMAGE_URL = `${IMAGE_URL}/images/`;

let imageid = window.location.search.split("=")[1];

function UpdateImage() {
  const [image, setImage] = React.useState([]);
  const [pageTitle, setPageTitle] = React.useState([]);
  React.useEffect(function () {
    axios
      .get(API_URL + imageid)
      .then(function (response) {
        setImage(response.data);
        setPageTitle(response.data.imagename);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <AdminHeader pageTitle={pageTitle} backURL="react_manage_images.html" />
      <div className="bodyContainer">
        <div id="imageContent">
          <UpdateImageCard image={image} />
        </div>
      </div>
    </>
  );
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<UpdateImage />);
