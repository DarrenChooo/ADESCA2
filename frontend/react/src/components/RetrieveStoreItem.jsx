const ITEMS_API_URL = `${API_URL}/items/`;
const CURRENCY_API_URL = `${API_URL}/currency/`;
const INVENTORY_API_URL = `${API_URL}/inventory/`;
IMAGE_URL = `${IMAGE_URL}/images/`;

const userid = localStorage.getItem("userid");
console.log(userid);

let itemid = window.location.search.split("=")[1];
console.log("itemid", itemid);

export default function RetrieveStoreItem(props) {
  const [item, setItem] = React.useState([]);
  const [error, setError] = React.useState([false, "Error Message"]);
  React.useEffect(() => {
    axios
      .get(ITEMS_API_URL + `${itemid}`)
      .then(function (item) {
        document.title = `Stardust Store - ${item.data.itemname}`;
        setItem(item.data);
        return item;
      })
      .then((item) => {
        axios
          .get(CURRENCY_API_URL + userid)
          .then((currency) => {
            const purchaseButton = document.getElementById("purchaseButton");
            if (currency.data[0].quantity >= item.data.cost) {
              purchaseButton.style.background = "#4298F5";
              purchaseButton.disabled = false;
              purchaseButton.style.cursor = "pointer";

              purchaseButton.onclick = () => {
                let quantity = currency.data[0].quantity - item.data.cost;

                axios
                  .put(CURRENCY_API_URL + userid, {
                    quantity: quantity,
                  })
                  .then(() => {
                    axios
                      .post(INVENTORY_API_URL, {
                        userid: userid,
                        itemid: itemid,
                        quantity: 1,
                      })
                      .then(() => {
                        alert(`Item ${item.data.itemname} has been purchased`);
                        window.location.reload();
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              };
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        setError([true, error.message]);
      });
  }, []);

  return !error[0] ? (
    <div className="itemContainer">
      <div id="storeItem">
        <div className="card">
          <img className="image" src={IMAGE_URL + item.imageurl} />
          <div className="textContainer">
            <h1 className="mainText">{item.itemname}</h1>
            <h3 className="subText">Item ID: {item.itemid}</h3>
            <h3 className="subText">Item Cost - {item.cost}</h3>
            <h3 className="subText">Minimum Level: {item.levelreq}</h3>
            <div className="buttonContainer">
              <button id="purchaseButton" disabled>
                Purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h1 style={{color: "white"}}>{error[1]}: Unable to find item {itemid}</h1>
  );
}
