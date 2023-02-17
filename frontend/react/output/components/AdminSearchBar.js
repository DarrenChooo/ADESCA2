export default function AdminSearchBar(props) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "searchCtn"
  }, /*#__PURE__*/React.createElement("a", {
    href: props.addURL
  }, /*#__PURE__*/React.createElement("img", {
    className: "searchCtnImg",
    id: "add",
    src: "../images/add.png"
  })), /*#__PURE__*/React.createElement("div", {
    className: "searchBar"
  }, /*#__PURE__*/React.createElement("input", {
    id: "searchInput",
    type: "text",
    placeholder: props.placeholder
  }), /*#__PURE__*/React.createElement("button", {
    id: "searchIcon",
    type: "submit"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-search"
  })))));
}