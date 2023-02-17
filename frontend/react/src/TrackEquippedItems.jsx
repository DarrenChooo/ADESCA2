import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

import AdminNavBar from "./components/AdminNavBar";
import ItemEquipStatsBarChart from "./components/ItemEquipStatsBarChart";
import ItemEquipStatsPieChart from "./components/ItemEquipStatsPieChart";
import ItemEquipStatsRadarChart from "./components/ItemEquipStatsRadarChart";
import ItemListView from "./components/ItemListView";

API_URL = API_URL + "/items/";
IMAGE_URL = IMAGE_URL + "/images/";

function TrackEquippedItems() {
  const [equippedItemStats, setEquippedItemStats] = useState([]);
  const [inspectItem, setInspectItem] = useState({
    itemname: "View items by clicking on them",
    itemid: 0,
    Damage: 0,
    Speed: 0,
    Cost: 0,
    Critrate: 0,
    Durability: 0,
  });

  const thereIsNothing =
    Object.keys(inspectItem).filter((key) => inspectItem[key] === 0).length ===
    6;

  return (
    <>
      <AdminNavBar pageTitle="Items Data" />
      <div className="flex-container" id="1">
        <ItemEquipStatsPieChart
          equippedItemStats={equippedItemStats}
          setEquippedItemStats={setEquippedItemStats}
          setInspectItem={setInspectItem}
        />
        <ItemEquipStatsBarChart
          equippedItemStats={equippedItemStats}
          setEquippedItemStats={setEquippedItemStats}
          setInspectItem={setInspectItem}
        />
        <ItemEquipStatsRadarChart
          isItemSelected={!thereIsNothing}
          equippedItemStats={equippedItemStats}
          inspectItem={inspectItem}
        />
        <ItemListView
          equippedItemStats={equippedItemStats}
          setInspectItem={setInspectItem}
        />
      </div>
    </>
  );
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<TrackEquippedItems />);
