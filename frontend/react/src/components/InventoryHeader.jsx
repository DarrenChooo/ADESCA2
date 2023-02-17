export default function InventoryHeader(props) {

    return (
        <header>
            <div className="wrap">My Inventory</div>
            <div className="wrap2" id="back">
                <a className="backBtn" href={props.backURL}>
                    <i id="backIcon" className="fa-solid fa-chevron-left"></i>
                    <span>Back</span>
                </a>
            </div>
        </header>
    )

}