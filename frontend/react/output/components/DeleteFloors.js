/// //////////////////////////////////////////////////////////////////
// Getting DeleteButton id from button ID
/// //////////////////////////////////////////////////////////////////
const deleteBtns = document.getElementsByClassName('deleteBtn');
const urlParams = new URLSearchParams(queryString);
const getNpcId = urlParams.get('npcid');
export default function DeleteNpcContent(props) {
  // function to send axios request using the inputs
  const deleteNpc = event => {
    event.preventDefault();

    // send axios request to delete npc
    axios.delete(`${API_URL  }/${getNpcId}`, {})
    // response successful
    .then(response => {
      console.log(response.data);
      alert(`NPC has been deleted!`);
      window.location.href = "/admin/react_manage_npcs.html";
    })

    // error
    .catch(error => {
      console.log(error);
    });
  };
  return /* #__PURE__ */React.createElement("div", {
    className: "card"
  }, props.npc.map(response => 
     /* #__PURE__ */React.createElement("div", {
      id: "contentBody"
    }, /* #__PURE__ */React.createElement("img", {
      className: "image",
      src: IMAGE_URL + response.imageurl,
      width: "100%",
      height: "60%"
    }), /* #__PURE__ */React.createElement("div", {
      className: "textContainer"
    }, /* #__PURE__ */React.createElement("h3", {
      className: "subText"
    }, "NPC ID: ", response.npcid), /* #__PURE__ */React.createElement("h3", {
      className: "subText"
    }, "Image ID: ", response.imageid), /* #__PURE__ */React.createElement("h3", {
      className: "subText"
    }, "Floor ID: ", response.floorid)), /* #__PURE__ */React.createElement("div", {
      className: "btnCtn"
    }, /* #__PURE__ */React.createElement("a", {
      href: `/admin/react_view_npc.html?npcid=${  response.npcid}`
    }, /* #__PURE__ */React.createElement("button", {
      id: "submitBtn",
      type: "button"
    }, "Cancel")), /* #__PURE__ */React.createElement("button", {
      id: "deleteNpc",
      onClick: deleteNpc,
      type: "button"
    }, "Delete")))
  ));
}