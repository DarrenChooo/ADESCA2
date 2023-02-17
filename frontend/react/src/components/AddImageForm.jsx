export default class UpdateImageForm extends React.Component {
  constructor(props) {
    super(props);

    this.imageFile = React.createRef();
    this.handleImageNameChange = this.handleImageNameChange.bind(this);
    this.handleImageSorterChange = this.handleImageSorterChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);

    this.state = {
      imagename: "",
      imagesorter: "",
    };
  }

  handleImageNameChange(event) {
    this.setState({ imagename: event.target.value });
  }

  handleImageSorterChange(event) {
    this.setState({ imagesorter: event.target.value });
  }

  handleUpload(event) {
    event.preventDefault();

    const image = this.imageFile.current.files[0];
    const formData = new FormData();
    formData.append("imagefile", image);

    const imagename = this.state.imagename;
    const imagesorter = this.state.imagesorter;

    axios
      .post(API_URL + "file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (imageURL) {
        const filename = imageURL.data;
        axios
          .post(API_URL, {
            imageurl: filename,
            imagename: imagename,
            imagesorter: imagesorter,
          })
          .then(() => {
            alert(`Image ${imagename} has been created`);
            window.location.assign("/admin/react_manage_images.html");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <form
        encType="multipart/form-data"
        className="postForm"
        onSubmit={this.handleUpload}
      >
        <div className="input">
          <label htmlFor="image" className="inputLabel">
            Image File:
          </label>
          <input
            type="file"
            id="postImage"
            name="imagefile"
            required
            ref={this.imageFile}
          />
        </div>
        <div className="input">
          <label htmlFor="imagename" className="inputLabel">
            Image Name:
          </label>
          <input
            type="text"
            id="postImageName"
            name="imagename"
            value={this.state.imagename}
            required
            onChange={this.handleImageNameChange}
          />
        </div>
        <div className="input">
          <label htmlFor="imagesorter" className="inputLabel">
            Image Type:
          </label>
          <select
            id="postImageSorter"
            name="imagesorter"
            value={this.state.imagesorter}
            onChange={this.handleImageSorterChange}
          >
            <option value="Item">Item</option>
            <option value="Floor">Floor</option>
            <option value="NPC">NPC</option>
            <option value="Boss">Boss</option>
            <option value="Player">Player</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <br />
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
