export default function RetrieveDialogueById(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, props.dialogue.map(response => {
    return /*#__PURE__*/React.createElement("div", {
      id: "contentBody"
    }, /*#__PURE__*/React.createElement("div", {
      className: "textContainer"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "subText"
    }, "Dialogue Description:"), /*#__PURE__*/React.createElement("h3", null, " ", response.dialoguedesc), /*#__PURE__*/React.createElement("h3", {
      className: "subText"
    }, "NPC ID: ", response.npcid)), /*#__PURE__*/React.createElement("div", {
      className: "btnCtn"
    }, /*#__PURE__*/React.createElement("a", {
      href: "/admin/react_update_dialogue.html?dialogueid=" + response.dialogueid
    }, /*#__PURE__*/React.createElement("button", {
      id: "submitBtn",
      type: "button"
    }, "Update")), /*#__PURE__*/React.createElement("a", {
      href: "/admin/react_delete_dialogue.html?dialogueid=" + response.dialogueid
    }, /*#__PURE__*/React.createElement("button", {
      id: "submitBtn",
      type: "button"
    }, "Delete"))));
  }));
}