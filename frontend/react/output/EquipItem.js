import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import ItemsHeader from "./components/ItemsHeader.js";
import ItemRadarChart from "./components/ItemRadarChart.js";
import MoreItems from "./components/MoreItems.js";
import ViewEquip from "./components/ViewEquip.js";
import Legend from "./components/EquipItemLegend.js";
function EquipItem() {
  const [itemId, setItemId] = useState(new URLSearchParams(window.location.search).get("itemid"));
  const [equippedItem, setEquippedItem] = useState({});
  const [incomingItem, setIncomingItem] = useState({});
  const [error, setError] = useState([false, "Error Message"]);
  return !error[0] ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ItemsHeader, {
    title: "Equip Item"
  }), /*#__PURE__*/React.createElement("div", {
    id: "flex-container1"
  }, /*#__PURE__*/React.createElement("div", {
    id: "radar-chart-container"
  }, /*#__PURE__*/React.createElement(ItemRadarChart, {
    itemId: itemId,
    setEquippedItem: setEquippedItem,
    setIncomingItem: setIncomingItem,
    setError: setError
  }), /*#__PURE__*/React.createElement(Legend, {
    equippedItem: equippedItem,
    incomingItem: incomingItem
  })), /*#__PURE__*/React.createElement("div", {
    id: "flex-container2"
  }, /*#__PURE__*/React.createElement(MoreItems, {
    setItemId: setItemId
  }), /*#__PURE__*/React.createElement(ViewEquip, {
    equippedItem: equippedItem,
    setError: setError
  })))) : /*#__PURE__*/React.createElement("h1", {
    style: {
      color: "white"
    }
  }, error[1], ": Unable to find item ", itemId);
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(EquipItem, null));