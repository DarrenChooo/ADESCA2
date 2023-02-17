export default class AddItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleItemNameChange = this.handleItemNameChange.bind(this);
    this.handleItemCostChange = this.handleItemCostChange.bind(this);
    this.handleLevelReqChange = this.handleLevelReqChange.bind(this);
    this.handleImageIdChange = this.handleImageIdChange.bind(this);
    this.handleCritRateChange = this.handleCritRateChange.bind(this);
    this.handleDurabilityChange = this.handleDurabilityChange.bind(this);
    this.handleDamageChange = this.handleDamageChange.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.state = {
      itemname: "",
      itemcost: "",
      levelreq: "",
      imageid: "",
      critrate: "",
      durability: "",
      damage: "",
      speed: ""
    };
  }
  handleItemNameChange(event) {
    this.setState({
      itemname: event.target.value
    });
  }
  handleItemCostChange(event) {
    this.setState({
      itemcost: event.target.value
    });
  }
  handleLevelReqChange(event) {
    this.setState({
      levelreq: event.target.value
    });
  }
  handleImageIdChange(event) {
    this.setState({
      imageid: event.target.value
    });
  }
  handleCritRateChange(event) {
    this.setState({
      critrate: event.target.value
    });
  }
  handleDurabilityChange(event) {
    this.setState({
      durability: event.target.value
    });
  }
  handleDamageChange(event) {
    this.setState({
      damage: event.target.value
    });
  }
  handleSpeedChange(event) {
    this.setState({
      speed: event.target.value
    });
  }
  handleUpload(event) {
    event.preventDefault();
    axios.post(API_URL, {
      itemname: this.state.itemname,
      cost: this.state.itemcost,
      levelreq: this.state.levelreq,
      imageid: this.state.imageid,
      critrate: this.state.critrate,
      durability: this.state.durability,
      damage: this.state.damage,
      speed: this.state.speed
    }).then(function () {
      alert(`Item has been created`);
      window.location.assign("/admin/react_manage_items.html");
    }).catch(error => {
      console.log(error);
    });
  }
  render() {
    return /*#__PURE__*/React.createElement("form", {
      className: "postForm",
      onSubmit: this.handleUpload
    }, /*#__PURE__*/React.createElement("div", {
      className: "input"
    }, /*#__PURE__*/React.createElement("label", {
      className: "inputLabel"
    }, "Item Name:"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "postItemName",
      placeholder: "Eg: 'Sword'",
      value: this.state.itemname,
      onChange: this.handleItemNameChange,
      required: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "input"
    }, /*#__PURE__*/React.createElement("label", {
      className: "inputLabel"
    }, "Item Cost:"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "postCost",
      placeholder: "Eg: '100'",
      value: this.state.itemcost,
      onChange: this.handleItemCostChange,
      required: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "input"
    }, /*#__PURE__*/React.createElement("label", {
      className: "inputLabel"
    }, "Level Requirement:"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "postLevelReq",
      placeholder: "Eg: '2'",
      value: this.state.levelreq,
      onChange: this.handleLevelReqChange,
      required: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "input"
    }, /*#__PURE__*/React.createElement("label", {
      className: "inputLabel"
    }, "Item ImageID:"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "postImageId",
      placeholder: "Eg: '14'",
      value: this.state.imageid,
      onChange: this.handleImageIdChange,
      required: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "input"
    }, /*#__PURE__*/React.createElement("label", {
      className: "inputLabel"
    }, "Item Critical Rate:"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "postImageId",
      placeholder: "Eg: '14'",
      value: this.state.critrate,
      onChange: this.handleCritRateChange,
      required: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "input"
    }, /*#__PURE__*/React.createElement("label", {
      className: "inputLabel"
    }, "Item Durability:"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "postImageId",
      placeholder: "Eg: '14'",
      value: this.state.durability,
      onChange: this.handleDurabilityChange,
      required: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "input"
    }, /*#__PURE__*/React.createElement("label", {
      className: "inputLabel"
    }, "Item Damage:"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "postImageId",
      placeholder: "Eg: '14'",
      value: this.state.damage,
      onChange: this.handleDamageChange,
      required: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "input"
    }, /*#__PURE__*/React.createElement("label", {
      className: "inputLabel"
    }, "Item Attack Speed:"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "postImageId",
      placeholder: "Eg: '14'",
      value: this.state.speed,
      onChange: this.handleSpeedChange,
      required: true
    })), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "button-container"
    }, /*#__PURE__*/React.createElement("button", {
      className: "button",
      type: "submit",
      id: "postButton"
    }, "Upload")));
  }
}