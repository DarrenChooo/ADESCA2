import React from "react";
const INVENTORY_API_URL = API_URL + "/inventory/";
const userid = localStorage.getItem("userid");
console.log(userid);
export default function MoreItems({
  setItemId
}) {
  const [moreItems, setMoreItems] = React.useState([]);
  React.useEffect(() => {
    // Exctracting of data using SQL
    axios.get(INVENTORY_API_URL + userid, {}).then(response => {
      console.log(response);
      setMoreItems(response.data);
    }).catch(error => {
      console.log(error);
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    id: "content-body"
  }, /*#__PURE__*/React.createElement("h1", {
    id: "content-title"
  }, "Your Items: "), /*#__PURE__*/React.createElement("div", {
    id: "items-body"
  }, moreItems.map(item => {
    return /*#__PURE__*/React.createElement("a", {
      className: "card",
      key: item.itemid,
      href: "react_equip_item.html?itemid=" + item.itemid,
      onMouseEnter: () => setItemId(item.itemid),
      onMouseLeave: () => setItemId(new URLSearchParams(window.location.search).get("itemid"))
    }, /*#__PURE__*/React.createElement("div", {
      className: "image-container"
    }, /*#__PURE__*/React.createElement("img", {
      className: "image",
      alt: item.itemname,
      src: IMAGE_URL + item.imageurl
    })));
  })));
}