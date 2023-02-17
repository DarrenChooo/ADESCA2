import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import AdminHeader from "./components/AdminHeader";
import AddImageForm from "./components/AddImageForm";

API_URL = `${API_URL}/image/`;

function AddImage() {
  return (
    <>
      <AdminHeader pageTitle="Upload Image" backURL="react_manage_images.html"/>
      <div className="bodyContainer">
        <div className="card">
          <div className="textContainer">
            <AddImageForm />
          </div>
        </div>
      </div>
    </>
  );
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AddImage />);
