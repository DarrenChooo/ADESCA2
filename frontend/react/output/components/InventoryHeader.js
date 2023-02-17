export default function InventoryHeader(props) {
  return /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, "My Inventory"), /*#__PURE__*/React.createElement("div", {
    className: "wrap2",
    id: "back"
  }, /*#__PURE__*/React.createElement("a", {
    className: "backBtn",
    href: props.backURL
  }, /*#__PURE__*/React.createElement("i", {
    id: "backIcon",
    className: "fa-solid fa-chevron-left"
  }), /*#__PURE__*/React.createElement("span", null, "Back"))));
}