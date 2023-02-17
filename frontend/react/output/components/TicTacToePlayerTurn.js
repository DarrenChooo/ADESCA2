export default function TicTacToePlayerTurn(props) {
  return /*#__PURE__*/React.createElement("div", {
    id: "whosTurn"
  }, props.winner && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, props.winner === "draw" ? "It's a draw!" : `${props.winner === props.symbol ? "Congrats! You won the game!" : "You lost the game. Better luck next time!"}`)), !props.winner && /*#__PURE__*/React.createElement(React.Fragment, null, props.symbol === props.turn ? /*#__PURE__*/React.createElement("p", null, "It's your turn!") : /*#__PURE__*/React.createElement("p", null, "It's the computer's turn")));
}