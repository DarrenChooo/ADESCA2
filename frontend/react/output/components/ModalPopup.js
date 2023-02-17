import InventoryDeleteBtn from "./InventoryDeleteButton.js";
import InventoryEquipBtn from "./InventoryEquipButton.js";

export default function ModalPopup(props) {
  return /* #__PURE__ */React.createElement("div", {
    id: "myModal",
    className: "modal"
  }, /* #__PURE__ */React.createElement("div", {
    className: "modal-content"
  }, /* #__PURE__ */React.createElement("span", {
    className: "close"
  }, "\xD7"), /* #__PURE__ */React.createElement("p", null, "Some text in the Modal.."), /* #__PURE__ */React.createElement(InventoryEquipBtn, {
    itemid: item_id
  }), /* #__PURE__ */React.createElement(InventoryDeleteBtn, null)));
}

// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};