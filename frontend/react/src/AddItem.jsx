import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import AdminHeader from "./components/AdminHeader";
import AddItemForm from "./components/AddItemForm";

API_URL = `${API_URL}/items/`;

function AddItem() {
  return (
    <>
      <AdminHeader pageTitle="Upload Item" backURL="react_manage_items.html"/>
      <div className="bodyContainer">
        <div className="card">
          <div className="textContainer">
            <AddItemForm />
          </div>
        </div>
      </div>
    </>
  );
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AddItem />);
