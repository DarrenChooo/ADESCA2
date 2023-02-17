import UpdateImageForm from "./UpdateImageForm.js";
export default function UpdateImageCard(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("img", {
    className: "image",
    src: IMAGE_URL + props.image.imageurl
  }), /*#__PURE__*/React.createElement("div", {
    className: "textContainer"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "mainText"
  }, props.image.imagename), /*#__PURE__*/React.createElement(UpdateImageForm, {
    image: props.image
  })));
}