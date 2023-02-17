export default function ItemsHeader(props) {
  return /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("a", {
    className: "backBtn",
    onClick: () => history.back()
  }, /*#__PURE__*/React.createElement("i", {
    id: "backIcon",
    className: "fa-solid fa-chevron-left"
  }), /*#__PURE__*/React.createElement("span", null, "Back")), /*#__PURE__*/React.createElement("center", {
    className: "wrap"
  }, props.title));
}