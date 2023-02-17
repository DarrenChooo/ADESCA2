export default function RetrieveInventory(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "layout wrap",
    id: "displayInventoryById"
  }, props.inventory.map(inventory => {
    return /*#__PURE__*/React.createElement("a", {
      href: "/user/react_inventory_item.html?itemid=" + inventory.itemid
    }, /*#__PURE__*/React.createElement("div", {
      className: "card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "image-container"
    }, /*#__PURE__*/React.createElement("img", {
      alt: inventory.itemname,
      src: IMAGE_URL + inventory.imageurl
    })), /*#__PURE__*/React.createElement("span", {
      className: "item-title"
    }, inventory.itemname), /*#__PURE__*/React.createElement("span", {
      className: "item-title"
    }, "Quanitity: ", inventory.quantity)));
  }));
}