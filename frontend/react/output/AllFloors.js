// Linking to users
/// //////////////////////////////////////////////////////////////////
// Importing React libraries
/// //////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";

/// //////////////////////////////////////////////////////////////////
// Importing web components from other jsx files
/// //////////////////////////////////////////////////////////////////
import AdminSearchBar from "./components/AdminSearchBar.js";
import useDidMountEffect from "./components/useDidMountEffect.js";

const USER_URL = `${API_URL  }/users/join/`;

// Linking to floors
const FLOOR_URL = `${API_URL  }/floors/`;

// Linking to Image file directory
const IMAGES_URL = `${IMAGE_URL  }/images/`;
function AllFloors() {
  const [userId] = React.useState(window.localStorage.getItem('userid'));
  const [floorId, setFloorId] = React.useState("");
  const [allFloorId, setAllFloorId] = React.useState([]);
  const [allFloorName, setAllFloorName] = React.useState([]);
  const [allFloorImageUrl, setAllFloorImageUrl] = React.useState([]);
  const [allFloorsInformation, setAllFloorsInformation] = React.useState([]);
  axios({
    method: 'get',
    url: USER_URL + userId
  }).then(response => {
    setFloorId(response.data.floorid);
  }).catch(err => {});
  useDidMountEffect(() => {
    // Declare 3 array variables to be pushed into React useStates
    const allFloorIds = [];
      const allFloorNames = [];
      const allFloorImageUrls = [];

    // Get all floors from the database to do a comparison
    axios({
      method: 'get',
      url: `${FLOOR_URL  }/allFloors`
    }).then(response => {
      response.data.slice(0, floorId).map(value => {
        // Does a map and slice the data at the user's max floor

        allFloorIds.push(value.floorid);
        allFloorNames.push(value.floorname);
        allFloorImageUrls.push(value.imageurl);
      });
      setAllFloorId(allFloorIds);
      setAllFloorName(allFloorNames);
      setAllFloorImageUrl(allFloorImageUrls);
    }).catch(err => {
      console.error(err);
    });
  }, [floorId]);
  useDidMountEffect(() => {}, [allFloorId]);
  return /* #__PURE__ */React.createElement(React.Fragment, null, /* #__PURE__ */React.createElement("div", {
    className: "topDisplay"
  }, /* #__PURE__ */React.createElement("div", {
    id: "adminTitleContainer"
  }, /* #__PURE__ */React.createElement("h1", {
    id: "adminTitle"
  }, "All Floors"))), /* #__PURE__ */React.createElement("div", {
    className: "centreCtn"
  }, /* #__PURE__ */React.createElement("div", {
    className: "contentBody"
  }, allFloorId.map((floorId, index) => 
     /* #__PURE__ */React.createElement("a", {
      href: "/user/react_floor.html"
    }, /* #__PURE__ */React.createElement("div", {
      key: floorId,
      id: floorId,
      className: "card"
    }, /* #__PURE__ */React.createElement("img", {
      "data-value": floorId,
      className: "contentImg",
      src: IMAGES_URL + allFloorImageUrl[index]
    }), /* #__PURE__ */React.createElement("div", {
      "data-value": floorId,
      className: "dataCtn"
    }, /* #__PURE__ */React.createElement("h3", null, "Level - ", floorId, ", ", allFloorName[index]))))
  ))));
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /* #__PURE__ */React.createElement(AllFloors, null));