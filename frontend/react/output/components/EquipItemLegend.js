import React from "react";
export default function Legend({
  equippedItem,
  incomingItem
}) {
  return /*#__PURE__*/React.createElement("div", {
    id: "legend-container"
  }, /*#__PURE__*/React.createElement("div", {
    id: "legend-item-container"
  }, /*#__PURE__*/React.createElement("div", {
    id: "legend-color-1"
  }), /*#__PURE__*/React.createElement("h3", {
    id: "legend-label"
  }, equippedItem.itemname, " (Currently equipped)")), /*#__PURE__*/React.createElement("div", {
    id: "legend-item-container"
  }, /*#__PURE__*/React.createElement("div", {
    id: "legend-color-2"
  }), /*#__PURE__*/React.createElement("h3", {
    id: "legend-label"
  }, incomingItem.itemname)));
}