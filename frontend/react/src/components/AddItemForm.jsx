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
      speed: "",
    };
  }

  handleItemNameChange(event) {
    this.setState({ itemname: event.target.value });
  }

  handleItemCostChange(event) {
    this.setState({ itemcost: event.target.value });
  }

  handleLevelReqChange(event) {
    this.setState({ levelreq: event.target.value });
  }

  handleImageIdChange(event) {
    this.setState({ imageid: event.target.value });
  }

  handleCritRateChange(event) {
    this.setState({ critrate: event.target.value });
  }

  handleDurabilityChange(event) {
    this.setState({ durability: event.target.value });
  }

  handleDamageChange(event) {
    this.setState({ damage: event.target.value });
  }

  handleSpeedChange(event) {
    this.setState({ speed: event.target.value });
  }


  handleUpload(event) {
    event.preventDefault();

    axios
      .post(API_URL, {
        itemname: this.state.itemname,
        cost: this.state.itemcost,
        levelreq: this.state.levelreq,
        imageid: this.state.imageid,
        critrate: this.state.critrate,
        durability: this.state.durability,
        damage: this.state.damage,
        speed: this.state.speed
      })
      .then(function () {
        alert(`Item has been created`);
        window.location.assign("/admin/react_manage_items.html");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <form className="postForm" onSubmit={this.handleUpload}>
        <div className="input">
          <label className="inputLabel">
            Item Name:
          </label>
          <input type="text" id="postItemName" placeholder="Eg: 'Sword'" value={this.state.itemname} onChange={this.handleItemNameChange} required />
        </div>
        <div className="input">
          <label className="inputLabel">
            Item Cost:
          </label>
          <input type="text" id="postCost" placeholder="Eg: '100'" value={this.state.itemcost} onChange={this.handleItemCostChange} required />
        </div>
        <div className="input">
          <label className="inputLabel">
            Level Requirement:
          </label>
          <input type="text" id="postLevelReq" placeholder="Eg: '2'" value={this.state.levelreq} onChange={this.handleLevelReqChange} required />
        </div>
        <div className="input">
          <label className="inputLabel">
            Item ImageID:
          </label>
          <input type="text" id="postImageId" placeholder="Eg: '14'" value={this.state.imageid} onChange={this.handleImageIdChange} required />
        </div>
        <div className="input">
          <label className="inputLabel">
            Item Critical Rate:
          </label>
          <input type="text" id="postImageId" placeholder="Eg: '14'" value={this.state.critrate} onChange={this.handleCritRateChange} required />
        </div>
        <div className="input">
          <label className="inputLabel">
            Item Durability:
          </label>
          <input type="text" id="postImageId" placeholder="Eg: '14'" value={this.state.durability} onChange={this.handleDurabilityChange} required />
        </div>
        <div className="input">
          <label className="inputLabel">
            Item Damage:
          </label>
          <input type="text" id="postImageId" placeholder="Eg: '14'" value={this.state.damage} onChange={this.handleDamageChange} required />
        </div>
        <div className="input">
          <label className="inputLabel">
            Item Attack Speed:
          </label>
          <input type="text" id="postImageId" placeholder="Eg: '14'" value={this.state.speed} onChange={this.handleSpeedChange} required />
        </div>
        <br />
        <div className="button-container">
          <button className="button" type="submit" id="postButton">
            Upload
          </button>
        </div>
      </form>
    );
  }
}
