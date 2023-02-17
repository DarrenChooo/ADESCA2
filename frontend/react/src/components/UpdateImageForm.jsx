let imageid = window.location.search.split("=")[1];

export default class UpdateImageForm extends React.Component {
  constructor(props) {
    super(props);

    this.imageFile = React.createRef();

    this.handleImageNameChange = this.handleImageNameChange.bind(this);
    this.handleImageSorterChange = this.handleImageSorterChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

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

  handleUpdate(event) {
    event.preventDefault();
    const imagename = this.state.imagename;
    const imagesorter = this.state.imagesorter;

    if (this.imageFile.current.files.length == 0) {
      axios
        .put(API_URL + imageid, {
          imagename: imagename,
          imagesorter: imagesorter,
        })
        .then(() => {
          window.location.reload();
          alert(`Image ${imageid} has been updated`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const Image = this.imageFile.current.files[0];
      const formData = new FormData();
      formData.append("imagefile", Image);

      axios
        .put(API_URL + `file/${imageid}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (ImageURL) {
          const filename = ImageURL.data;

          axios
            .put(API_URL + imageid, {
              imageurl: filename,
              imagename: imagename,
              imagesorter: imagesorter,
            })
            .then(() => {
              window.location.reload();
              alert(`Image ${imageid} has been updated`);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleDelete(event) {
    event.preventDefault();
    axios
      .delete(API_URL + imageid)
      .then(function () {
        alert(`image ${imageid} has been deleted`);
        window.location.assign("/admin/react_manage_images.html");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <form
        encType="multipart/form-data"
        className="updateForm"
        onSubmit={this.handleUpdate}
      >
        <div className="input">
          <label for="image" className="inputLabel">
            Change Image:
          </label>
          <input
            type="file"
            id="updateImage"
            name="imagefile"
            ref={this.imageFile}
          />
        </div>
        <div className="input">
          <label for="imagename" className="inputLabel">
            Change Image Name:
          </label>
          <input
            type="text"
            id="updateImageName"
            name="imagename"
            value={this.state.imagename}
            onChange={this.handleImageNameChange}
            required
          />
        </div>
        <div className="input">
          <label for="imagesorter" className="inputLabel">
            Change Image Type:
          </label>
          <select
            id="updateImageSorter"
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
          <button className="button" type="submit" id="updateButton">
            Update
          </button>
          <button
            className="button"
            type="button"
            id="deleteButton"
            onClick={this.handleDelete}
          >
            Delete
          </button>
        </div>
      </form>
    );
  }
}
