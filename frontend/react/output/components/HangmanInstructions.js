export default function Instructions({
  changeGameState
}) {
  // Function to set user is ready
  function changeGameState() {
    setGameState(false);
  }
  return /*#__PURE__*/React.createElement("div", {
    key: "instructions"
  }, /*#__PURE__*/React.createElement("h2", null, "This is a hangman game based from a random word generator"), /*#__PURE__*/React.createElement("h2", null, "You get ten tries before its game over"), /*#__PURE__*/React.createElement("h2", null, "There will be a timer of 3 minutes"), /*#__PURE__*/React.createElement("div", {
    className: "buttonCtn"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: changeGameState,
    className: "startButton",
    type: "button"
  }, "Start Game")));
}