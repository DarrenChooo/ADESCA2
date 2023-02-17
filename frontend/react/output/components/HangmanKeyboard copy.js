export default function Keyboard({
  handleClick,
  setLettersArray
}) {
  return /* #__PURE__ */React.createElement("div", {
    id: "keyboard",
    onClick: handleClick
  }, setLettersArray.map((value, index) => 
     /* #__PURE__ */React.createElement(React.Fragment, null, index % 9 === 0 && /* #__PURE__ */React.createElement("div", {
      key: index,
      className: "divider"
    }), /* #__PURE__ */React.createElement("button", {
      key: `lettersArr${  value}`,
      className: "letters",
      id: value,
      "data-value": value
    }, value))
  ));
}