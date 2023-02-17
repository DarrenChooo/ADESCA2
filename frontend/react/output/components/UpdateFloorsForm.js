/////////////////////////////////////////////////////////////////////
//Getting Floor ID from the URL
/////////////////////////////////////////////////////////////////////
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const floorId = urlParams.get('floorid');

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import ErrorPage from "./ErrorPage.js";
export default function UpdateFloorForm(props) {
  const [imageId, setImageId] = React.useState("");
  const [floorName, setFloorName] = React.useState("");
  const [imageUrl, setImageURL] = React.useState("");

  // For error handling
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [errorData, setErrorData] = React.useState("");
  React.useEffect(() => {
    // Send Axios GET request for floors by Floor ID
    axios({
      method: 'get',
      url: API_URL + floorId
    }).then(response => {
      setImageId(response.data.imageid);
      setFloorName(response.data.floorname);
      setImageURL(response.data.imageurl);
    }).catch(error => {
      setError(true);
      setErrorMessage(error.response.status);
      setErrorData(error.response.data);
    });
  }, []);

  // Function to update state of imageId using setImageId when the input is updated in the input element
  const handleImageId = event => {
    // Update imageId
    setImageId(event.target.value);
  };

  // Function to update state of floorName using setFloorName when the input is updated in the input element
  const handleFloorName = event => {
    // Update floorName
    setFloorName(event.target.value);
  };

  // Function to send Axios PUT request using the inputs
  const handleSubmitForm = event => {
    event.preventDefault();
    console.log("Image ID:" + imageId);
    console.log("Floor Name:" + floorName);

    //Check whether admin has entered variables <- Needed for SQl Coalesce
    if (floorName) {
      setImageId(null);
    } else {
      setFloorName(null);
    }

    // send axios request to update npc
    axios.put(API_URL + `${floorId}`, {
      imageId: imageId,
      floorName: floorName
    })
    // response successful
    .then(response => {
      alert(response.data.message);
      location.reload();
    }).catch(error => {
      setError(true);
      setErrorMessage(error.response.status);
      setErrorData(error.response.data);
    });
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, error ? /*#__PURE__*/React.createElement(ErrorPage, {
    setErrorMessage: errorMessage,
    setErrorData: errorData
  }) : /*#__PURE__*/React.createElement("div", {
    className: "centreCtn"
  }, /*#__PURE__*/React.createElement("div", {
    id: "contentBody"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("img", {
    className: "contentImg",
    src: IMAGE_URL + imageUrl
  }), /*#__PURE__*/React.createElement("div", {
    className: "dataCtn"
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmitForm
  }, /*#__PURE__*/React.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React.createElement("input", {
    onChange: handleImageId,
    type: "text",
    id: "imageIdIpt",
    placeholder: imageId
  }), /*#__PURE__*/React.createElement("label", {
    className: "inputLabel"
  }, "Image ID")), /*#__PURE__*/React.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React.createElement("input", {
    onChange: handleFloorName,
    type: "text",
    id: "floorNameIpt",
    placeholder: floorName
  }), /*#__PURE__*/React.createElement("label", {
    className: "inputLabel"
  }, "Floor Name")), /*#__PURE__*/React.createElement("div", {
    className: "btnCtn"
  }, /*#__PURE__*/React.createElement("button", {
    id: "submitBtn"
  }, "Submit"))))))));
}