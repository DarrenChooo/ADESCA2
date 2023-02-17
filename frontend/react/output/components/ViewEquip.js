import React, { useEffect, useState } from "react";
const ITEMS_API_URL = API_URL + "/items/";
const USER_API_URL = API_URL + "/users/";
const itemid = window.location.search.split("=")[1];
const userid = localStorage.getItem("userid");
export default function ViewEquip({
  equippedItem,
  setError
}) {
  const [viewingItem, setViewingItem] = useState({});
  useEffect(() => {
    axios.get(ITEMS_API_URL + itemid).then(response => {
      setViewingItem(response.data);
    }).catch(error => {
      console.log(error);
      setError([true, error.message]);
    });
  }, []);

  // Function to handle updating of User's equipped item
  const handleEquip = event => {
    event.preventDefault();

    // Axios request to update User's equipped item
    axios.put(USER_API_URL + `equip/` + userid + `/` + itemid).then(() => {
      alert(`You have equipped a ${viewingItem.itemname}`);
      window.location.reload();
    }).catch(error => {
      console.log(error);
      alert(error);
    });
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    id: "flex-container3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "image-container"
  }, /*#__PURE__*/React.createElement("img", {
    className: "image",
    alt: equippedItem.itemname,
    src: IMAGE_URL + equippedItem.imageurl
  })), /*#__PURE__*/React.createElement("h3", {
    className: "card-text"
  }, "Currently Equipped")), /*#__PURE__*/React.createElement("div", {
    id: "arrow-icon-container"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-angle-up",
    id: "arrowIcon"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-angle-up",
    id: "arrowIcon"
  }), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-angle-up",
    id: "arrowIcon"
  })), /*#__PURE__*/React.createElement("div", {
    className: "card2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "image-container"
  }, /*#__PURE__*/React.createElement("img", {
    className: "image",
    alt: viewingItem.itemname,
    src: IMAGE_URL + viewingItem.imageurl
  })), /*#__PURE__*/React.createElement("h3", {
    className: "card-text"
  }, "Equip ", viewingItem.itemname, "?"))), /*#__PURE__*/React.createElement("div", {
    id: "equipButton"
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: handleEquip
  }, /*#__PURE__*/React.createElement("button", {
    className: "button",
    type: "submit"
  }, "Equip ", viewingItem.itemname))));
}