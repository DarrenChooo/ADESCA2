export default function InventoryDeleteBtn(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "button"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGE_URL + "/deleteIcon.png",
    alt: "delete",
    className: "btnIcon"
  }), /*#__PURE__*/React.createElement("span", {
    className: "btnText"
  }, "Delete")));
}