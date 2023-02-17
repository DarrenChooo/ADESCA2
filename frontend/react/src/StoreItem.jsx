import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import ItemsHeader from "./components/ItemsHeader";
import RetrieveStoreItem from "./components/RetrieveStoreItem";

function StoreItem() {
  return (
    <>
      <ItemsHeader backURL="react_store.html" title="Stardust Store" />
      <RetrieveStoreItem />
    </>
  );
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<StoreItem />);
