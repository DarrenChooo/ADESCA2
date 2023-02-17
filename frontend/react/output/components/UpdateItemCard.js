import UpdateItemForm from "./UpdateItemForm.js";
export default function UpdateItemCard(props) {
  return /*#__PURE__*/React.createElement("div", {
    class: "card"
  }, /*#__PURE__*/React.createElement("img", {
    class: "image",
    src: IMAGE_URL + props.item.imageurl
  }), /*#__PURE__*/React.createElement("div", {
    class: "textContainer"
  }, /*#__PURE__*/React.createElement("h1", {
    class: "mainText"
  }, props.item.itemname), /*#__PURE__*/React.createElement(UpdateItemForm, null)));
}