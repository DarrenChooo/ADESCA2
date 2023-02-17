export default function AdminSearchBar(props) {

	return (
        <>
         {/* Search Bar Container*/}
         <div className="searchCtn">
            {/* Add Images Button*/}
            <a href={props.addURL}>
                <img className="searchCtnImg" id="add" src="../images/add.png"></img>
            </a>

            <div className="searchBar">
                <input id="searchInput" type="text" placeholder={props.placeholder} />
                <button id="searchIcon" type="submit">
                    <i className="fa fa-search"></i>
                </button>
            </div>
        </div>
        </>
    )
}