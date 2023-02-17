export default function RetrieveCurrency(props) {
  return /*#__PURE__*/React.createElement("div", {
    id: "displayCurrency",
    className: "wrap"
  }, props.currency.map(currency => {
    return /*#__PURE__*/React.createElement("div", {
      className: "currencyCard",
      key: currency.userid
    }, /*#__PURE__*/React.createElement("span", {
      className: "displayDiv1"
    }, "Username: ", currency.username), /*#__PURE__*/React.createElement("span", {
      className: "displayDiv2"
    }, "User ID: ", currency.userid), /*#__PURE__*/React.createElement("span", {
      className: "displayDiv3"
    }, "Quantity: ", currency.quantity), /*#__PURE__*/React.createElement("span", {
      className: "displayDiv4"
    }, "Currency ID: ", currency.currencyid), /*#__PURE__*/React.createElement("a", {
      className: "button",
      href: "/admin/react_update_currency.html?userid=" + currency.userid
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      id: "updateIdButton"
    }, "Update")));
  }));
}