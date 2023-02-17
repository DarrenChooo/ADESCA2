export default function UserHeader(props) {
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
    href: "/user/react_floor.html"
  }, /*#__PURE__*/React.createElement("i", {
    id: "returnIcon",
    className: "fa-solid fa-chevron-left"
  })), /*#__PURE__*/React.createElement("a", {
    href: "javascript:void(0)",
    className: "closeBtn",
    onClick: closeNav
  }, "\xD7"), /*#__PURE__*/React.createElement("a", {
    href: "view_players.html"
  }, "Players"), /*#__PURE__*/React.createElement("a", {
    href: "view_requests.html"
  }, "Friend Requests"), /*#__PURE__*/React.createElement("a", {
    href: "view_friends.html"
  }, "Friends"), /*#__PURE__*/React.createElement("a", {
    href: "view_blocked.html"
  }, "Blocked"), /*#__PURE__*/React.createElement("a", {
    href: "/user/react_floor.html",
    style: {
      color: "ivory"
    }
  }, "Resume Game")), /*#__PURE__*/React.createElement("span", {
    id: "sideNavBtn",
    onClick: openNav
  }, "\u2630"), /*#__PURE__*/React.createElement("div", {
    id: "adminTitleContainer"
  }, /*#__PURE__*/React.createElement("h1", {
    id: "adminTitle"
  }, props.pageTitle)));
}