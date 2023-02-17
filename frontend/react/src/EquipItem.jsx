import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import ItemsHeader from "./components/ItemsHeader";
import ItemRadarChart from "./components/ItemRadarChart";
import MoreItems from "./components/MoreItems";
import ViewEquip from "./components/ViewEquip";
import Legend from "./components/EquipItemLegend";

function EquipItem() {
  const [itemId, setItemId] = useState(
    new URLSearchParams(window.location.search).get("itemid")
  );
  const [equippedItem, setEquippedItem] = useState({});
  const [incomingItem, setIncomingItem] = useState({});
  const [error, setError] = useState([false, "Error Message"]);

  return !error[0] ? (
    <>
      <ItemsHeader title="Equip Item" />
      <div id="flex-container1">
        <div id="radar-chart-container">
          <ItemRadarChart
            itemId={itemId}
            setEquippedItem={setEquippedItem}
            setIncomingItem={setIncomingItem}
            setError={setError}
          />
          <Legend equippedItem={equippedItem} incomingItem={incomingItem} />
        </div>
        <div id="flex-container2">
          <MoreItems setItemId={setItemId} />
          <ViewEquip equippedItem={equippedItem} setError={setError} />
        </div>
      </div>
    </>
  ) : (
    <h1 style={{ color: "white" }}>
      {error[1]}: Unable to find item {itemId}
    </h1>
  );
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<EquipItem />);
