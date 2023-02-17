/////////////////////////////////////////////////////////////////////
//Getting user id from the URL
/////////////////////////////////////////////////////////////////////
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const item_id = urlParams.get('itemid');
const user_id = localStorage.getItem('userid');
const ITEM_API_URL = API_URL + "/items/";
// console.log(ITEM_API_URL)

import InventoryItemInfo from "./InventoryItemInfo";
import InventoryEquipBtn from "./InventoryEquipButton";
import InventoryDeleteBtn from "./InventoryDeleteButton";

export default function UpdateInventoryForm(props) {
    const [quantity, setQuantity] = React.useState("");
    const [displayDeleted, setDeleted] = React.useState([]);


    //constantly update the state of the input
    const handleQtyChange = event => {
        //event.target.value is the value of the input
        setQuantity(event.target.value)
        // console.log(quantity)
    }

    const handleSubmitForm = event => {
        //prevent page from refreshing
        event.preventDefault();
        // console.log("User ID: " + user_id);
        // console.log("Quantity: " + quantity);

        axios.delete(API_URL + `${user_id}/${item_id}`, {

            data: { //for axios.delete must set data option.
                quantity: quantity
            }

        })
        axios.get(ITEM_API_URL + item_id, {})
            .then(function (body) {
                let item = body.data
                // console.log(item)
                axios.get(API_URL + `${user_id}/${item_id}`, {})
                    .then(function (body) {
                        // if body.data.length > 0, display body.data[0] else quanitity 0
                        let inv = body.data.length > 0 ? body.data[0] : { quantity: 0 }
                        // console.log(inv)
                        //if quantity is 0, display item deleted and go to react_inventory.html
                        if (inv.quantity === 0) {
                            setDeleted(<div>
                                <h2 className="deleteText">You are have no more {item.itemname}!</h2>
                            </div>)
                            const myTimeout = setTimeout(reload, 1200);
                            function reload() {
                                location.href = "/user/react_inventory.html"
                            }
                    
                            // if input quantity is greater than item quantity, display item quantity and go to react_inventory.html
                        } else if (quantity > inv.quantity){
                            setDeleted(<div>
                                <h2 className="deleteText">Invalid! <br></br>You have only {inv.quantity} {item.itemname}!</h2>
                            </div>)
                            
                            //if quantity is not 0, display item quantity and refresh page
                        } else {
                            setDeleted(<div>
                                <h2 className="deleteText">You are left with {inv.quantity} {item.itemname}!</h2>
                            </div>)
                            const myTimeout = setTimeout(reload, 1200);
                            function reload() {
                                location.reload();
                            }
                        }
                    })
                    //Error Checking
                    .catch((error) => {
                        console.log(error)
                        alert(error)
                    })
            })
            //Error Checking
            .catch((error) => {
                console.log(error)
                alert(error)
            })
    }
    return (
        <div className="layout wrap">
            <InventoryItemInfo />
            <form id="updateInventoryForm" onSubmit={handleSubmitForm}>
                <div className="formRow">
                    <label>Quantity: </label>
                    <input name="quantityInput" id="UPDATEquantityInput" placeholder="Eg: 1" onChange={handleQtyChange} />
                </div>
                {displayDeleted}
                <InventoryEquipBtn itemid={item_id}/>
                <InventoryDeleteBtn /> 
            </form> 
        </div>
    )
}