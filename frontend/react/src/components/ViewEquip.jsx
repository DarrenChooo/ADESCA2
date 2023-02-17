import React, { useEffect, useState } from "react";

const ITEMS_API_URL = API_URL + "/items/";
const USER_API_URL = API_URL + "/users/";

const itemid = window.location.search.split("=")[1];
const userid = localStorage.getItem("userid");

export default function ViewEquip({ equippedItem, setError }) {
  const [viewingItem, setViewingItem] = useState({});
  useEffect(() => {
    axios
      .get(ITEMS_API_URL + itemid)
      .then((response) => {
        setViewingItem(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError([true, error.message])
      });
  }, []);

  // Function to handle updating of User's equipped item
  const handleEquip = (event) => {
    event.preventDefault();

    // Axios request to update User's equipped item
    axios
      .put(USER_API_URL + `equip/` + userid + `/` + itemid)
      .then(() => {
        alert(`You have equipped a ${viewingItem.itemname}`);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };
  
  return (
    <>
      <div id="flex-container3">
        <div className="card2">
          <div className="image-container">
            <img
              className="image"
              alt={equippedItem.itemname}
              src={IMAGE_URL + equippedItem.imageurl}
            />
          </div>
          <h3 className="card-text">Currently Equipped</h3>
        </div>
        <div id="arrow-icon-container">
          <i className="fa-solid fa-angle-up" id="arrowIcon" />
          <i className="fa-solid fa-angle-up" id="arrowIcon" />
          <i className="fa-solid fa-angle-up" id="arrowIcon" />
        </div>
        <div className="card2">
          <div className="image-container">
            <img
              className="image"
              alt={viewingItem.itemname}
              src={IMAGE_URL + viewingItem.imageurl}
            />
          </div>
          <h3 className="card-text">Equip {viewingItem.itemname}?</h3>
        </div>
      </div>
      <div id="equipButton">
        <form onSubmit={handleEquip}>
          <button className="button" type="submit">
            Equip {viewingItem.itemname}
          </button>
        </form>
      </div>
    </>
  );
}
