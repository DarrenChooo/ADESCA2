import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import AdminNavBar from "./components/AdminNavBar";
import UpdateBossCard from "./components/UpdateBossCard";

API_URL = `${API_URL}/boss/`;
IMAGE_URL = `${IMAGE_URL}/images/`;

function ManageBoss() {
  return (
    <div>
      <AdminNavBar pageTitle="Boss Manager" />
      <div className="bodyContainer">
        <div className="flexContainer">
          <UpdateBossCard />
        </div>
      </div>
    </div>
  );
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ManageBoss />);
