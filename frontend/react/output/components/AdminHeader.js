export default function AdminHeader(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "topDisplay"
  }, /*#__PURE__*/React.createElement("a", {
    className: "backBtn",
    href: props.backURL
  }, /*#__PURE__*/React.createElement("i", {
    id: "backIcon",
    className: "fa-solid fa-chevron-left"
  })), /*#__PURE__*/React.createElement("div", {
    id: "adminTitleContainer"
  }, /*#__PURE__*/React.createElement("h1", {
    id: "adminTitle"
  }, props.pageTitle)));
}