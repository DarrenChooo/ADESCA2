// Linking to Floors and Images URL
// Importing React libraries
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";

// Importing web components from other jsx files
import AdminNavBar from "./components/AdminNavBar.js";
import AdminSearchBar from "./components/AdminSearchBar.js";
import RetrieveFloors from "./components/RetrieveFloors.js";
import ErrorPage from "./components/ErrorPage.js";
const FLOOR_URL = `${API_URL}/floors/`;
IMAGE_URL += '/images/';
function ManageFloors() {
  const [floors, setFloors] = useState([]);

  // For error handling
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [errorData, setErrorData] = React.useState("");
  useEffect(() => {
    axios({
      method: 'get',
      url: `${FLOOR_URL}allFloors`
    }).then(response => {
      setFloors(response.data);
    }).catch(error => {
      setError(true);
      setErrorMessage(error.response.status);
      setErrorData(error.response.data);
    });

    // Listen to click on search icon button
    searchIcon.addEventListener('click', event => {
      event.preventDefault();
      axios({
        method: 'get',
        url: `${FLOOR_URL}name/${searchInput.value}`
      }).then(response => {
        setFloors(response.data);
      }).catch(error => {
        setError(true);
        setErrorMessage(error.response.status);
        setErrorData(error.response.data);
      });
    });

    // Listen to 'enter' key on search input
    searchInput.addEventListener('keypress', event => {
      if (event.key === "Enter") {
        event.preventDefault();
        axios({
          method: 'get',
          url: `${FLOOR_URL}name/${searchInput.value}`
        }).then(response => {
          setFloors(response.data);
        }).catch(error => {
          setError(true);
          setErrorMessage(error.response.status);
          setErrorData(error.response.data);
        });
      }
    });
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, error ? /*#__PURE__*/React.createElement(ErrorPage, {
    setErrorMessage: errorMessage,
    setErrorData: errorData
  }) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AdminNavBar, {
    pageTitle: "Floor Manager"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bodyContainer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flexContainer"
  }, /*#__PURE__*/React.createElement(AdminSearchBar, {
    addURL: "/admin/react_add_floors.html"
  }), /*#__PURE__*/React.createElement(RetrieveFloors, {
    setError: setError,
    setErrorMessage: setErrorMessage,
    setErrorData: setErrorData,
    floors: floors
  })))));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(ManageFloors, null));