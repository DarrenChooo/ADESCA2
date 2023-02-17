import React from "react";

export default function Legend({equippedItem, incomingItem}) {
  return (
    <div id="legend-container">
      {/* Legend for currently equipped item data */}
      <div id="legend-item-container">
        <div id="legend-color-1"></div>
        <h3 id="legend-label">{equippedItem.itemname} (Currently equipped)</h3>
      </div>
      
      {/* Legend for data of item that the equipped item is being compared to (eg. viewed item/incoming item) */}
      <div id="legend-item-container">
        <div id="legend-color-2"></div>
        <h3 id="legend-label">{incomingItem.itemname}</h3>
      </div>
    </div>
  );
}
