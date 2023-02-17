// IMAGE_URL = IMAGE_URL + '/images/';

export default function RetrieveNpcs(props) {
  return /* #__PURE__ */React.createElement("div", {
    id: "contentBody"
  }, props.npcs.map(response => 
     /* #__PURE__ */React.createElement("a", {
      href: `/admin/react_view_npc.html?npcid=${  response.npcid}`,
      className: "card"
    }, /* #__PURE__ */React.createElement("img", {
      className: "image",
      src: IMAGE_URL + response.imageurl,
      width: "130px",
      height: "130px"
    }), /* #__PURE__ */React.createElement("div", {
      className: "textContainer"
    }, /* #__PURE__ */React.createElement("h3", {
      className: "mainText"
    }, response.npcname), /* #__PURE__ */React.createElement("h3", {
      className: "subText"
    }, "NPC ID: ", response.npcid), /* #__PURE__ */React.createElement("h3", {
      className: "subText"
    }, "Image ID: ", response.imageid), /* #__PURE__ */React.createElement("h3", {
      className: "subText"
    }, "Floor ID: ", response.floorid)))
  ));
}