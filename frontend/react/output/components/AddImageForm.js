export default class UpdateImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.imageFile = React.createRef();
    this.handleImageNameChange = this.handleImageNameChange.bind(this);
    this.handleImageSorterChange = this.handleImageSorterChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.state = {
      imagename: "",
      imagesorter: ""
    };
  }
  handleImageNameChange(event) {
    this.setState({
      imagename: event.target.value
    });
  }
  handleImageSorterChange(event) {
    this.setState({
      imagesorter: event.target.value
    });
  }
  handleUpload(event) {
    event.preventDefault();
    const image = this.imageFile.current.files[0];
    const formData = new FormData();
    formData.append("imagefile", image);
    const imagename = this.state.imagename;
    const imagesorter = this.state.imagesorter;
    axios.post(API_URL + "file", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(function (imageURL) {
      const filename = imageURL.data;
      axios.post(API_URL, {
        imageurl: filename,
        imagename: imagename,
        imagesorter: imagesorter
      }).then(() => {
        alert(`Image ${imagename} has been created`);
        window.location.assign("/admin/react_manage_images.html");
      }).catch(err => {
        console.log(err);
      });
    }).catch(error => {
      console.log(error);
    });
  }
  render() {
    return /*#__PURE__*/React.createElement("form", {
      encType: "multipart/form-data",
      className: "postForm",
      onSubmit: this.handleUpload
    }, /*#__PURE__*/React.createElement("div", {
      className: "input"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "image",
      className: "inputLabel"
    }, "Image File:"), /*#__PURE__*/React.createElement("input", {
      type: "file",
      id: "postImage",
      name: "imagefile",
      required: true,
      ref: this.imageFile
    })), /*#__PURE__*/React.createElement("div", {
      className: "input"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "imagename",
      className: "inputLabel"
    }, "Image Name:"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "postImageName",
      name: "imagename",
      value: this.state.imagename,
      required: true,
      onChange: this.handleImageNameChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "input"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "imagesorter",
      className: "inputLabel"
    }, "Image Type:"), /*#__PURE__*/React.createElement("select", {
      id: "postImageSorter",
      name: "imagesorter",
      value: this.state.imagesorter,
      onChange: this.handleImageSorterChange
    }, /*#__PURE__*/React.createElement("option", {
      value: "Item"
    }, "Item"), /*#__PURE__*/React.createElement("option", {
      value: "Floor"
    }, "Floor"), /*#__PURE__*/React.createElement("option", {
      value: "NPC"
    }, "NPC"), /*#__PURE__*/React.createElement("option", {
      value: "Boss"
    }, "Boss"), /*#__PURE__*/React.createElement("option", {
      value: "Player"
    }, "Player"), /*#__PURE__*/React.createElement("option", {
      value: "Others"
    }, "Others"))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "button-container"
    }, /*#__PURE__*/React.createElement("button", {
      className: "button",
      type: "submit",
      id: "postButton"
    }, "Upload")));
  }
}