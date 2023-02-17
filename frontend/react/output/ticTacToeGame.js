/////////////////////////////////////////////////////////////////////
//Linking to floors and images url
/////////////////////////////////////////////////////////////////////
const FLOOR_URL = API_URL + '/floors/';
IMAGE_URL = IMAGE_URL + '/images/';

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import TicTacToeContent from "./components/TicTacToeContent.js";
const TicTacToeGame = () => {
  const [startTime, setStartTime] = useState(Date.now());
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    id: "header"
  }, /*#__PURE__*/React.createElement("h1", null, "TIC TAC TOE GAME")), /*#__PURE__*/React.createElement(TicTacToeContent, {
    startTime: startTime,
    setStartTime: setStartTime
  }));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(TicTacToeGame, null));