//Linking to users
const USER_URL = API_URL + '/users/join/';

//Linking to floors
const FLOOR_URL = API_URL + '/floors/';

//Linking to Image file directory
const IMAGES_URL = IMAGE_URL + '/images/';

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import useDidMountEffect from "./useDidMountEffect.js";
export default function AllFloors({
  setFloorId,
  setSelectedFloor,
  setError
}) {
  const [userId] = React.useState(window.localStorage.getItem('userid'));
  const [maxFloorId, setMaxFloorId] = React.useState("");
  const [allFloorId, setAllFloorId] = React.useState([]);
  const [allFloorName, setAllFloorName] = React.useState([]);
  const [allFloorImageUrl, setAllFloorImageUrl] = React.useState([]);

  // Update state to show floor is clicked
  function updateFloor(event) {
    console.log("currently updating");
    let newFloorId = event.target.getAttribute('data-value');
    setFloorId(newFloorId);
    setSelectedFloor(false);
  }

  // Gets floorid by userid
  axios({
    method: 'get',
    url: USER_URL + userId
  }).then(response => {
    setMaxFloorId(response.data.floorid);
  }).catch(error => {
    setError(error);
  });
  useDidMountEffect(() => {
    // Declare 3 array variables to be pushed into React useStates
    let allFloorIds = [],
      allFloorNames = [],
      allFloorImageUrls = [];

    // Get all floors from the database to do a comparison
    axios({
      method: 'get',
      url: FLOOR_URL + '/allFloors'
    }).then(response => {
      response.data.slice(0, maxFloorId).map(value => {
        //Does a map and slice the data at the user's max floor
        allFloorIds.push(value.floorid);
        allFloorNames.push(value.floorname);
        allFloorImageUrls.push(value.imageurl);
      });
      setAllFloorId(allFloorIds);
      setAllFloorName(allFloorNames);
      setAllFloorImageUrl(allFloorImageUrls);
    }).catch(err => {
      setError(error);
    });
  }, [maxFloorId]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topDisplay"
  }, /*#__PURE__*/React.createElement("div", {
    id: "adminTitleContainer"
  }, /*#__PURE__*/React.createElement("h1", {
    id: "adminTitle"
  }, "All Floors"))), /*#__PURE__*/React.createElement("div", {
    className: "centreCtn"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contentBody"
  }, allFloorId.map((floorId, index) => {
    return /*#__PURE__*/React.createElement("div", {
      onClick: updateFloor,
      key: floorId,
      id: floorId,
      className: "card"
    }, /*#__PURE__*/React.createElement("img", {
      "data-value": floorId,
      className: "contentImg",
      src: IMAGES_URL + allFloorImageUrl[index]
    }), /*#__PURE__*/React.createElement("div", {
      "data-value": floorId,
      className: "dataCtn"
    }, /*#__PURE__*/React.createElement("h3", null, "Level - ", floorId, ", ", allFloorName[index])));
  }))));
}