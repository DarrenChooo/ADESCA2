export default function RetrieveInventory(props) {

    return (
        <div className="layout wrap" id="displayInventoryById">
            {props.inventory.map((inventory) => {
                return (
                    <a href={"/user/react_inventory_item.html?itemid=" + inventory.itemid}>
                        <div className="card">
                            <div className="image-container">
                                <img alt={inventory.itemname} src={IMAGE_URL + inventory.imageurl} />
                            </div>
                            <span className="item-title">{inventory.itemname}</span>
                            <span className="item-title">Quanitity: {inventory.quantity}</span>
                        </div>
                    </a>
                )
            })}
        </div>
    );
}
 
