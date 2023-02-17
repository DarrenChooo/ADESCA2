import React, { useRef, useEffect, useState } from "react";

function ItemListView({ equippedItemStats, setInspectItem }) {
  return (
    <div className="all-items">
      {equippedItemStats.map((item) => {
        return (
          <div
            className="card"
            key={item.itemid}
            onClick={() => {
              setInspectItem(item);
            }}
          >
            <img
              className="image"
              alt={item.itemname}
              src={IMAGE_URL + item.imageurl}
            />
            <h3 className="item-name-label">{item.itemname}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default ItemListView;
