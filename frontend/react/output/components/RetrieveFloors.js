export default function RetrieveFloors({
  floors,
  setError,
  setErrorMessage,
  setErrorData
}) {
  const deleteFloor = event => {
    event.preventDefault();
    const floorId = event.target.id;
    axios({
      method: 'delete',
      url: API_URL + `/floors/${floorId}`
    }).then(response => {
      alert(response.data.message);
      location.reload();
    }).catch(error => {
      setError(true);
      setErrorMessage(error.response.status);
      setErrorData(error.response.data);
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    id: "contentBody"
  }, floors.map(response => {
    return /*#__PURE__*/React.createElement("div", {
      className: "card"
    }, /*#__PURE__*/React.createElement("img", {
      className: "contentImg",
      src: IMAGE_URL + response.imageurl
    }), /*#__PURE__*/React.createElement("div", {
      className: "dataCtn"
    }, /*#__PURE__*/React.createElement("h3", null, "Level - ", response.floorid, ", ", response.floorname), /*#__PURE__*/React.createElement("a", {
      href: "/admin/react_update_floors.html?floorid=" + response.floorid
    }, /*#__PURE__*/React.createElement("button", {
      className: "updateBtn"
    }, "Update")), /*#__PURE__*/React.createElement("button", {
      onClick: deleteFloor,
      id: response.floorid,
      className: "deleteBtn"
    }, "Delete")));
  }));
}