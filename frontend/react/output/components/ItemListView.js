import React, { useRef, useEffect, useState } from "react";
function ItemListView({
  equippedItemStats,
  setInspectItem
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "all-items"
  }, equippedItemStats.map(item => {
    return /*#__PURE__*/React.createElement("div", {
      className: "card",
      key: item.itemid,
      onClick: () => {
        setInspectItem(item);
      }
    }, /*#__PURE__*/React.createElement("img", {
      className: "image",
      alt: item.itemname,
      src: IMAGE_URL + item.imageurl
    }), /*#__PURE__*/React.createElement("h3", {
      className: "item-name-label"
    }, item.itemname));
  }));
}
export default ItemListView;