API_URL = `${API_URL}/image/`;
IMAGE_URL = `${IMAGE_URL}/images/`;
export default function RetrieveImages(props) {
  return /*#__PURE__*/React.createElement("div", {
    id: "imagesContent"
  }, props.images.map(image => {
    return /*#__PURE__*/React.createElement("a", {
      href: "/admin/react_update_image.html?imageid=" + image.imageid,
      className: "card"
    }, /*#__PURE__*/React.createElement("img", {
      className: "image",
      src: IMAGE_URL + image.imageurl
    }), /*#__PURE__*/React.createElement("div", {
      className: "textContainer"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "mainText"
    }, image.imagename), /*#__PURE__*/React.createElement("h3", {
      className: "subText"
    }, "ImageID: ", image.imageid), /*#__PURE__*/React.createElement("h3", {
      className: "subText"
    }, "Image Category - ", image.imagesorter)));
  }));
}