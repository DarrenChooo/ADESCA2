/////////////////////////////////////////////////////////////////////
//Linking to dialogue URL
/////////////////////////////////////////////////////////////////////
API_URL = API_URL + '/dialogues';

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import AdminNavBar from "./components/AdminNavBar.js";
import AdminSearchBar from "./components/AdminSearchBar.js";
import RetrieveDialogues from "./components/RetrieveDialogues.js";
import Pagination from "./components/Pagination.js"; /////////////////////////////////////////////////////////////////////
//Setting the value of pagination from the value taken from URL
/////////////////////////////////////////////////////////////////////
let pagination = window.location.search.split('=')[1];
if (pagination === undefined) {
  pagination = 1;
}
console.log("Pagination: " + pagination);
const ManageDialogues = () => {
  const [dialogues, setDialogues] = React.useState([]);
  const [pageCount, setPageCount] = React.useState([]);
  React.useEffect(() => {
    // send axios request to get all dialogue via pagination
    axios.get(API_URL + `/page/${pagination}`, {})

    // response successful
    .then(response => {
      console.log(response.data.length);
      setDialogues(response.data);

      // send axios request to count the number of dialogues in database
      axios.get(API_URL + `/count/dialogues`, {})

      // response successful
      .then(count => {
        console.log("Total number of dialogues: " + count.data[0].count);
        setPageCount(Math.ceil(count.data[0].count / 10));
      })

      //error response
      .catch(error => {
        console.log(error);
      });
    })

    // error response
    .catch(error => {
      console.log(error);
    });

    // add event listener for search bar
    searchInput.addEventListener("keypress", event => {
      if (event.key === "Enter") {
        event.preventDefault();

        // send axios request to get all npcs that contains the keyword input
        axios.get(API_URL + `/search/${searchInput.value}`, {})

        // response successful
        .then(response => {
          // console.log(response.data.rows[0]);
          setDialogues(response.data.rows);
        }).catch(error => {
          console.log(error);
          alert(error);
        });
      }
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AdminNavBar, {
    pageTitle: "Dialogue Manager"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
    className: "bodyContainer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flexContainer"
  }, /*#__PURE__*/React.createElement(AdminSearchBar, {
    addURL: "/admin/react_add_dialogue.html"
  }), /*#__PURE__*/React.createElement(RetrieveDialogues, {
    dialogues: dialogues
  })), /*#__PURE__*/React.createElement(Pagination, {
    page: pagination,
    pageCount: pageCount
  })));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(ManageDialogues, null));