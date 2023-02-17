export default function ErrorPage({
  setErrorMessage,
  setErrorData
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "errorPage"
  }, /*#__PURE__*/React.createElement("h1", null, setErrorMessage), /*#__PURE__*/React.createElement("div", {
    className: "cloakWrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cloakContainer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cloak"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "info"
  }, /*#__PURE__*/React.createElement("h2", null, "We can't find that page"), /*#__PURE__*/React.createElement("p", null, "We're fairly sure that page used to be here, but seems to have gone missing. Please refresh the page."), /*#__PURE__*/React.createElement("h3", null, setErrorData)));
}