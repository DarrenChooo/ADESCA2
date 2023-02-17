export default function AdminHeader(props) {
	return (
        <div className="topDisplay"> 
        {/* Go to back Icon */}
        <a className="backBtn" href={props.backURL}>
            <i id="backIcon" className="fa-solid fa-chevron-left"></i>
        </a>

        {/* Game Title */}
        <div id="adminTitleContainer">
            <h1 id="adminTitle">{props.pageTitle}</h1>
        </div>
    </div>
    )
}