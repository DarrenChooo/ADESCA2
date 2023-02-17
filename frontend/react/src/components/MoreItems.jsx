import React from "react";

const INVENTORY_API_URL = API_URL + "/inventory/";
const userid = localStorage.getItem("userid");
console.log(userid);

export default function MoreItems({ setItemId }) {
  const [moreItems, setMoreItems] = React.useState([]);

  React.useEffect(() => {
    // Exctracting of data using SQL
    axios
      .get(INVENTORY_API_URL + userid, {})
      .then((response) => {
        console.log(response);
        setMoreItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div id="content-body">
      <h1 id="content-title">Your Items: </h1>
      <div id="items-body">
        {moreItems.map((item) => {
          return (
            <a
              className="card"
              key={item.itemid}
              href={"react_equip_item.html?itemid=" + item.itemid}
              onMouseEnter={() => setItemId(item.itemid)}
              onMouseLeave={() =>
                setItemId(
                  new URLSearchParams(window.location.search).get("itemid")
                )
              }
            >
              <div className="image-container">
                <img
                  className="image"
                  alt={item.itemname}
                  src={IMAGE_URL + item.imageurl}
                />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
