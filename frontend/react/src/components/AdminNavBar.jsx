export default function AdminNavBar(props) {

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
            <a href="/admin/home.html">
                <i id="homeIcon"className="fa-solid fa-house"></i>
            </a>
            <a href="javascript:void(0)" className="closeBtn" onClick={closeNav}>&times;</a>
            <a href="/admin/react_manage_currency.html">Currency</a>
            <a href="/admin/inventory_graph.html">Inventory Graph</a>
            <a href="/admin/manage_spin.html">Spin The Wheel</a>
            <a href="/admin/react_manage_dialogues.html?pagination=1">Dialogue</a>
            <a href="/admin/react_manage_floors.html">Floors</a>
            <a href="/admin/game_analysis_dashboard.html">Game</a>
            <a href="/admin/react_manage_images.html">Image</a>
            <a href="/admin/react_manage_items.html">Items</a>
            <a href="/admin/track_equipped_items.html">Item Statistics</a>
            <a href="/admin/react_manage_npcs.html">NPC</a>
            <a href="/admin/manage_user.html">Users</a>
            <a href="/admin/manage_post.html">Post</a>
            <a href="/admin/react_manage_boss.html">Boss</a>
            <a href="./../index.html" id="logoutButton" style={{color: "red"}}>Log out</a>
        </div>
            <span id="sideNavBtn" onClick={openNav}>☰</span>
        <div id="adminTitleContainer">
            <h1 id="adminTitle">{props.pageTitle}</h1>
        </div>
    </div>
    )
}