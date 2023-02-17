/////////////////////////////////////////////////////////////////////
//Getting user id from the URL
/////////////////////////////////////////////////////////////////////
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const item_id = urlParams.get('itemid');
const user_id = localStorage.getItem('userid');
export default function InventoryItemInfo(props) {
  const [selectedItem, setItem] = React.useState([]);
  React.useEffect(() => {
    axios.get(API_URL + `${user_id}/${item_id}`, {})
    // response successful
    .then(body => {
      // console.log(body.data.length);
      setItem(body.data[0]);
    })
    // error response
    .catch(error => {
      console.log(error);
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "image-container"
  }, /*#__PURE__*/React.createElement("img", {
    alt: selectedItem.itemname,
    src: IMAGE_URL + selectedItem.imageurl
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "item-title itemname"
  }, "Name: ", selectedItem.itemname)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "item-title"
  }, "Quanitity: ", selectedItem.quantity)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "item-title"
  }, "Level Required: ", selectedItem.levelreq)));
}