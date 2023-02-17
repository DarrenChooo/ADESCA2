export default function AnswerContainer({
  setAnswerArray,
  setCorrectGuesses
}) {
  return /*#__PURE__*/React.createElement("div", {
    id: "answerCtn"
  }, setAnswerArray.map((letter, index) => {
    return setCorrectGuesses.includes(letter) ? /*#__PURE__*/React.createElement("div", {
      key: letter + index,
      className: "answerBox"
    }, letter) : /*#__PURE__*/React.createElement("div", {
      key: letter + index,
      className: "answerBox"
    }, "_");
  }));
}