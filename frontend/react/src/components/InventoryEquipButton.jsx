export default function InventoryEquipBtn(props) {

    return (
 
            <div className="button">
            <button type="button">
            <a className="equipBtn"
                href={"/user/react_equip_item.html?itemid=" + props.itemid}>
                    {/**sword icon */}
                    <img src={IMAGE_URL+"/swordIcon.png"} alt="sword" className="btnIcon" />
                <span className="btnText">Equip&nbsp;</span>
            </a>
            </button>
            </div>
      
    )

}