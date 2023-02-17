export default function UserHeader(props) {
  //Open side navigation bar
  function openNav() {
    document.getElementById("sideNav").style.width = "250px";
  }
  //Close side navigation bar
  function closeNav() {
    document.getElementById("sideNav").style.width = "0";
  }

  return (
    <div className="topDisplay">
      <div id="sideNav" className="sideNav">
        <a href="/user/react_floor.html">
          <i id="returnIcon" className="fa-solid fa-chevron-left"></i>
        </a>
        <a href="javascript:void(0)" className="closeBtn" onClick={closeNav}>
          &times;
        </a>
        <a href="view_players.html">Players</a>
        <a href="view_requests.html">Friend Requests</a>
        <a href="view_friends.html">Friends</a>
        <a href="view_blocked.html">Blocked</a>
        <a href="/user/react_floor.html" style={{ color: "ivory" }}>
          Resume Game
        </a>
      </div>
      <span id="sideNavBtn" onClick={openNav}>
        ☰
      </span>
      <div id="adminTitleContainer">
        <h1 id="adminTitle">{props.pageTitle}</h1>
      </div>
    </div>
  );
}
