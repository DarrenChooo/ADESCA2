export default function AddFloorForm({
  setError,
  setErrorMessage,
  setErrorData
}) {
  const [imageId, setImageId] = React.useState("");
  const [floorName, setFloorName] = React.useState("");

  // Function to update state of floorName using setFloorName when the input is updated in the input element
  const handleFloorNameInput = event => {
    // Update Floor name with new name
    setFloorName(event.target.value);
    console.log("Floor Name:" + floorName);
  };

  // function to update state of imageId using setImageId when the input is updated in the input element
  const handleImageIdInput = event => {
    // Update ImageID with new ID
    setImageId(event.target.value);
    console.log("Image Id:" + imageId);
  };

  //Listen to click on submit button
  const handleSubmitForm = event => {
    event.preventDefault();
    console.log("Floor Name:" + floorName);
    console.log("Image Id:" + imageId);

    // Send Axios POST request to add new floor
    axios({
      method: 'post',
      url: API_URL,
      data: {
        floorName: floorName,
        imageId: imageId
      }
    }).then(response => {
      alert('New Floor Inserted');
      location.reload();
    }).catch(error => {
      setError(true);
      setErrorMessage(error.response.status);
      setErrorData(error.response.data);
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "centreCtn"
  }, /*#__PURE__*/React.createElement("div", {
    id: "contentBody"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dataCtn"
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmitForm
  }, /*#__PURE__*/React.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React.createElement("input", {
    onChange: handleImageIdInput,
    type: "text",
    id: "imageIdIpt",
    placeholder: "Enter image ID"
  }), /*#__PURE__*/React.createElement("label", {
    className: "inputLabel"
  }, "Image ID")), /*#__PURE__*/React.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React.createElement("input", {
    onChange: handleFloorNameInput,
    type: "text",
    id: "floorNameIpt",
    placeholder: "Enter Floor Name"
  }), /*#__PURE__*/React.createElement("label", {
    className: "inputLabel"
  }, "Floor Name")), /*#__PURE__*/React.createElement("div", {
    className: "btnCtn"
  }, /*#__PURE__*/React.createElement("button", {
    id: "submitBtn",
    type: "submit"
  }, "Submit")))))));
}