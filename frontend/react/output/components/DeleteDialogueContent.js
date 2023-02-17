/////////////////////////////////////////////////////////////////////
//Getting dialogue id from the URL
/////////////////////////////////////////////////////////////////////
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let getDialogueId = urlParams.get('dialogueid');
export default function DeleteDialogueContent(props) {
  // function to send axios request using the inputs
  const deleteDialogue = event => {
    event.preventDefault();

    // send axios request to delete dialogue
    axios.delete(API_URL + `/${getDialogueId}`, {})
    //response successful
    .then(response => {
      console.log(response.data);
      alert(`Dialogue has been deleted!`);
      window.location.href = "/admin/react_manage_dialogues.html";
    })

    // error
    .catch(error => {
      console.log(error);
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, props.dialogue.map(response => {
    return /*#__PURE__*/React.createElement("div", {
      id: "contentBody"
    }, /*#__PURE__*/React.createElement("div", {
      className: "textContainer"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "subText"
    }, "Dialogue ID: ", response.dialogueid), /*#__PURE__*/React.createElement("h3", {
      className: "subText"
    }, "Dialogue Description: ", response.dialoguedesc), /*#__PURE__*/React.createElement("h3", {
      className: "subText"
    }, "NPC ID: ", response.npcid)), /*#__PURE__*/React.createElement("div", {
      className: "btnCtn"
    }, /*#__PURE__*/React.createElement("a", {
      href: "/admin/react_view_dialogue.html?dialogueid=" + response.dialogueid
    }, /*#__PURE__*/React.createElement("button", {
      id: "submitBtn",
      type: "button"
    }, "Cancel")), /*#__PURE__*/React.createElement("button", {
      id: "deleteDialogue",
      onClick: deleteDialogue,
      type: "button"
    }, "Delete")));
  }));
}