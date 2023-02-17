export default function Tries({
  setTries
}) {
  return /*#__PURE__*/React.createElement("div", {
    id: "tries"
  }, /*#__PURE__*/React.createElement("h1", {
    key: "try" + setTries,
    id: "triesCount"
  }, "Tries: ", setTries));
}