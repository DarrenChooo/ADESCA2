import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import AdminNavBar from "./components/AdminNavBar";
import AdminSearchBar from "./components/AdminSearchBar";
import RetrieveItems from "./components/RetrieveItems";

API_URL = API_URL + "/items/";
IMAGE_URL = IMAGE_URL + "/images/";

function ManageItems() {
  const [items, setItems] = React.useState([]);
  React.useEffect(function () {
    axios
      .get(API_URL)
      .then(function (response) {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        axios
          .get(API_URL + `search/${searchInput.value}`)
          .then(function (response) {
            setItems(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }, []);

  return (
    <>
      <AdminNavBar pageTitle="Items Manager" />
      <div className="bodyContainer">
        <div className="flexContainer">
          <AdminSearchBar addURL="react_add_item.html" placeholder="Search Items" />
          <RetrieveItems items={items} />
        </div>
      </div>
      <br />
    </>
  );
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ManageItems />);
