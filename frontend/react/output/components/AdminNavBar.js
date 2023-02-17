export default function AdminNavBar(props) {
  //Open side navigation bar
  function openNav() {
    document.getElementById("sideNav").style.width = "250px";
  }

  //Close side navigation bar
  function closeNav() {
    document.getElementById("sideNav").style.width = "0";
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "topDisplay"
  }, /*#__PURE__*/React.createElement("div", {
    id: "sideNav",
    className: "sideNav"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/admin/home.html"
  }, /*#__PURE__*/React.createElement("i", {
    id: "homeIcon",
    className: "fa-solid fa-house"
  })), /*#__PURE__*/React.createElement("a", {
    href: "javascript:void(0)",
    className: "closeBtn",
    onClick: closeNav
  }, "\xD7"), /*#__PURE__*/React.createElement("a", {
    href: "/admin/react_manage_currency.html"
  }, "Currency"), /*#__PURE__*/React.createElement("a", {
    href: "/admin/inventory_graph.html"
  }, "Inventory Graph"), /*#__PURE__*/React.createElement("a", {
    href: "/admin/manage_spin.html"
  }, "Spin The Wheel"), /*#__PURE__*/React.createElement("a", {
    href: "/admin/react_manage_dialogues.html?pagination=1"
  }, "Dialogue"), /*#__PURE__*/React.createElement("a", {
    href: "/admin/react_manage_floors.html"
  }, "Floors"), /*#__PURE__*/React.createElement("a", {
    href: "/admin/game_analysis_dashboard.html"
  }, "Game"), /*#__PURE__*/React.createElement("a", {
    href: "/admin/react_manage_images.html"
  }, "Image"), /*#__PURE__*/React.createElement("a", {
    href: "/admin/react_manage_items.html"
  }, "Items"), /*#__PURE__*/React.createElement("a", {
    href: "/admin/track_equipped_items.html"
  }, "Item Statistics"), /*#__PURE__*/React.createElement("a", {
    href: "/admin/react_manage_npcs.html"
  }, "NPC"), /*#__PURE__*/React.createElement("a", {
    href: "/admin/manage_user.html"
  }, "Users"), /*#__PURE__*/React.createElement("a", {
    href: "/admin/manage_post.html"
  }, "Post"), /*#__PURE__*/React.createElement("a", {
    href: "/admin/react_manage_boss.html"
  }, "Boss"), /*#__PURE__*/React.createElement("a", {
    href: "./../index.html",
    id: "logoutButton",
    style: {
      color: "red"
    }
  }, "Log out")), /*#__PURE__*/React.createElement("span", {
    id: "sideNavBtn",
    onClick: openNav
  }, "\u2630"), /*#__PURE__*/React.createElement("div", {
    id: "adminTitleContainer"
  }, /*#__PURE__*/React.createElement("h1", {
    id: "adminTitle"
  }, props.pageTitle)));
}