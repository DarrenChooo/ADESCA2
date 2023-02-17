import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import ItemsHeader from "./components/ItemsHeader";
import RetrieveStoreItems from "./components/RetrieveStoreItems";

const USER_API_URL = API_URL + "/users/";
const ITEMS_API_URL = API_URL + "/items/";
IMAGE_URL = IMAGE_URL + "/images/";

const userid = localStorage.getItem("userid");
console.log(userid);

function Store() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(USER_API_URL + `join/` + userid, {})
      .then(function (response) {
        axios
          .get(ITEMS_API_URL + `store/` + response.data.floorid, {})
          .then(function (response) {
            setItems(response.data);
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, []);

  return (
    <>
      <ItemsHeader backURL="/user/react_floor.html" title="Stardust Store" />
      <RetrieveStoreItems items={items} />
    </>
  );
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Store />);
