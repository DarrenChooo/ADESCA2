export default function RetrieveDialogues(props) {
  return /*#__PURE__*/React.createElement("div", {
    id: "contentBody"
  }, props.dialogues.map(response => {
    return /*#__PURE__*/React.createElement("a", {
      href: "/admin/react_view_dialogue.html?dialogueid=" + response.dialogueid,
      className: "card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "textContainer"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "mainText"
    }, "Dialogue ID: ", response.dialogueid), /*#__PURE__*/React.createElement("h3", {
      className: "subText"
    }, "Dialogue Description: ", response.dialoguedesc), /*#__PURE__*/React.createElement("h3", {
      className: "subText"
    }, "NPC ID: ", response.npcid)));
  }));
}