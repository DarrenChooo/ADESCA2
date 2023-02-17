/////////////////////////////////////////////////////////////////////
//Linking to dialogue URL
/////////////////////////////////////////////////////////////////////
API_URL = API_URL + '/currency';

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
import RetrieveCurrency from "./components/RetrieveCurrency.js"; /////////////////////////////////////////////////////////////////////
//Setting the value of pagination from the value taken from URL
/////////////////////////////////////////////////////////////////////
const ManageCurrency = () => {
  //use state store value of currency
  const [currency, setCurrency] = React.useState([]);
  //use effect to get all currency
  React.useEffect(() => {
    // send axios request to get all currency
    axios.get(API_URL + `/all`, {})
    // response successful
    .then(body => {
      // console.log(body.data.length);
      setCurrency(body.data);
    })
    // error response
    .catch(error => {
      console.log(error);
    });

    //Listen to click on search icon button
    searchIcon.addEventListener('click', event => {
      //Prevent page from reloading
      event.preventDefault();
      //Get search input                    
      axios.get(API_URL + `/search/${searchInput.value}`, {})
      // response successful
      .then(body => {
        if (body.data.length == 0) {
          alert("No results found");
          //dont set state
          return;
        }
        console.log(body.data);
        setCurrency(body.data);
      }).catch(error => {
        console.log(error);
      });
    });

    // add event listener for search bar
    searchInput.addEventListener("keypress", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        // send axios request to get all npcs that contains the keyword input
        axios.get(API_URL + `/search/${searchInput.value}`, {})
        // response successful
        .then(body => {
          if (body.data.length == 0) {
            alert("No results found");
            //dont set state
            return;
          }
          console.log(body.data);
          setCurrency(body.data);
        }).catch(error => {
          console.log(error);
        });
      }
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AdminNavBar, {
    pageTitle: "Currency Manager"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flexCtn"
  }, /*#__PURE__*/React.createElement(AdminSearchBar, {
    placeholder: "Search Username"
  }), /*#__PURE__*/React.createElement(RetrieveCurrency, {
    currency: currency
  }))));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(ManageCurrency, null));