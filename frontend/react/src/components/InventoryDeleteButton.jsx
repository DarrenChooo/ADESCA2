export default function InventoryDeleteBtn(props) {
    return (
        <div className="button">
            <button type="submit">
                    <img src={IMAGE_URL + "/deleteIcon.png"} alt="delete" className="btnIcon" />
                    <span className="btnText">Delete</span>
            </button>
        </div>
    )
}