export default function RetrieveItems(props) {
  return /*#__PURE__*/React.createElement("div", {
    id: "itemsContent"
  }, props.items.map(item => {
    return /*#__PURE__*/React.createElement("a", {
      href: "/admin/react_update_item.html?itemid=" + item.itemid,
      className: "card"
    }, /*#__PURE__*/React.createElement("img", {
      className: "image",
      src: IMAGE_URL + item.imageurl
    }), /*#__PURE__*/React.createElement("div", {
      className: "textContainer"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "mainText"
    }, item.itemname), /*#__PURE__*/React.createElement("h3", {
      className: "subText"
    }, "Item ID: ", item.itemid), /*#__PURE__*/React.createElement("h3", {
      className: "subText"
    }, "Item Cost - ", item.cost), /*#__PURE__*/React.createElement("h3", {
      className: "subText"
    }, "Minimum Level: ", item.levelreq)));
  }));
}