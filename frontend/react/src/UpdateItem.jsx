import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import AdminHeader from "./components/AdminHeader";
import UpdateItemCard from "./components/UpdateItemCard";

API_URL = API_URL + "/items/";
IMAGE_URL = IMAGE_URL + "/images/";

let itemid = window.location.search.split("=")[1];

function UpdateItem() {
  const [item, setItem] = React.useState([]);
  const [pageTitle, setPageTitle] = React.useState([]);
  React.useEffect(function () {
    axios
      .get(API_URL + itemid)
      .then(function (response) {
        setItem(response.data);
        setPageTitle(response.data.itemname);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <AdminHeader pageTitle={pageTitle} backURL="react_manage_items.html" />
      <div className="bodyContainer">
        <div id="imageContent">
          <UpdateItemCard item={item} />
        </div>
      </div>
    </>
  );
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<UpdateItem />);
