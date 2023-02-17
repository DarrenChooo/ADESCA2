export default function RetrieveNpcById(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, props.npc.map(response => {
    return /*#__PURE__*/React.createElement("div", {
      id: "contentBody"
    }, /*#__PURE__*/React.createElement("img", {
      className: "image",
      src: IMAGE_URL + response.imageurl,
      width: "100%",
      height: "60%"
    }), /*#__PURE__*/React.createElement("div", {
      className: "textContainer"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "subText"
    }, "NPC ID: ", response.npcid), /*#__PURE__*/React.createElement("h3", {
      className: "subText"
    }, "Image ID: ", response.imageid), /*#__PURE__*/React.createElement("h3", {
      className: "subText"
    }, "Floor ID: ", response.floorid)), /*#__PURE__*/React.createElement("div", {
      className: "btnCtn"
    }, /*#__PURE__*/React.createElement("a", {
      href: "/admin/react_update_npc.html?npcid=" + response.npcid
    }, /*#__PURE__*/React.createElement("button", {
      id: "submitBtn",
      type: "button"
    }, "Update")), /*#__PURE__*/React.createElement("a", {
      href: "/admin/react_delete_npc.html?npcid=" + response.npcid
    }, /*#__PURE__*/React.createElement("button", {
      id: "submitBtn",
      type: "button"
    }, "Delete"))));
  }));
}