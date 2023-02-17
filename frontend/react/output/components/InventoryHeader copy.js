export default function InventoryEquipBtn(props) {
  return /* #__PURE__ */React.createElement("div", {
    className: "wrap2",
    id: "equip"
  }, /* #__PURE__ */React.createElement("a", {
    className: "equipBtn",
    href: `/user/react_inventory_equip.html?itemid=${  props.itemid}`
  }, /* #__PURE__ */React.createElement("i", {
    id: "equipIcon",
    className: "fa-solid fa-wrench"
  }), /* #__PURE__ */React.createElement("span", null, "Equip")));
}