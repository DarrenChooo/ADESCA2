export default function RetrieveStoreItems(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "layout",
    id: "storeItems"
  }, props.items.map(item => {
    return /*#__PURE__*/React.createElement("a", {
      href: "react_store_item.html?itemid=" + item.itemid,
      className: "card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "image-container"
    }, /*#__PURE__*/React.createElement("img", {
      alt: item.itemname,
      src: IMAGE_URL + item.imageurl
    })), /*#__PURE__*/React.createElement("h3", {
      className: "item-title"
    }, item.itemname), /*#__PURE__*/React.createElement("span", {
      className: "item-title"
    }, "Cost: ", item.cost));
  }));
}