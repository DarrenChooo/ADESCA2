import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import AdminNavBar from "./components/AdminNavBar";
import AdminSearchBar from "./components/AdminSearchBar";
import RetrieveImages from "./components/RetrieveImages";
import Pagination from "./components/Pagination";

let pagination = window.location.search.split("=")[1];

if (pagination === undefined) {
  pagination = 1;
}

function ManageImages() {
  const [images, setImages] = React.useState([]);
  const [pageCount, setPageCount] = React.useState([]);
  React.useEffect(function () {
    axios
      .get(API_URL + `page/` + pagination)
      .then(function (response) {
        setImages(response.data[0]);
        setPageCount(Math.ceil(response.data[1][0].count / 12));
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
            setImages(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }, []);

  return (
    <div>
      <AdminNavBar pageTitle="Images Manager" />
      <div className="bodyContainer">
        <div className="flexContainer">
          <AdminSearchBar addURL="/admin/react_add_image.html" placeholder="Search Images"/>
          <RetrieveImages images={images} page={pagination} />
          <Pagination page={pagination} pageCount={pageCount} />
        </div>
      </div>
    </div>
  );
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ManageImages />);
