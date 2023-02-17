export default function RetrieveFloors(props) {
  const deleteFloor = event => {
    event.preventDefault();
    axios({
      method: 'delete',
      url: `${API_URL  }/${floorid}`
    }).then(response => {
      alert(response.data.message);
      location.reload();
    }).catch(error => {
      window.alert(`Failed to delete existing floor, key in a valid id`);
      console.log(error);
    });
  };
  return /* #__PURE__ */React.createElement("div", {
    id: "contentBody"
  }, props.floors.map(response => 
     /* #__PURE__ */React.createElement("div", {
      className: "card"
    }, /* #__PURE__ */React.createElement("img", {
      className: "contentImg",
      src: IMAGE_URL + response.imageurl
    }), /* #__PURE__ */React.createElement("div", {
      className: "dataCtn"
    }, /* #__PURE__ */React.createElement("h3", null, "Level - ", response.floorid, ", ", response.floorname), /* #__PURE__ */React.createElement("a", {
      href: `/admin/react_update_floors.html?floorid=${  response.floorid}`
    }, /* #__PURE__ */React.createElement("button", {
      className: "updateBtn"
    }, "Update")), /* #__PURE__ */React.createElement("button", {
      onClick: deleteFloor,
      id: `deleteBtn${  response.floorid}`,
      className: "deleteBtn"
    }, "Delete")))
  ));
}