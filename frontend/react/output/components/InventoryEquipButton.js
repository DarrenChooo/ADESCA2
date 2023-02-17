export default function InventoryEquipBtn(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "button"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button"
  }, /*#__PURE__*/React.createElement("a", {
    className: "equipBtn",
    href: "/user/react_equip_item.html?itemid=" + props.itemid
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGE_URL + "/swordIcon.png",
    alt: "sword",
    className: "btnIcon"
  }), /*#__PURE__*/React.createElement("span", {
    className: "btnText"
  }, "Equip\xA0"))));
}