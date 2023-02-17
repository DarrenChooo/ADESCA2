/////////////////////////////////////////////////////////////////////
//Linking to Floor and Image URL
/////////////////////////////////////////////////////////////////////
API_URL = API_URL + '/floors/';
IMAGE_URL = IMAGE_URL + '/images/';

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import AdminHeader from "./components/AdminHeader";
import UpdateFloorsForm from './components/UpdateFloorsForm';

const UpdateFloors = () => {

    return (
        <div>
            <AdminHeader pageTitle="Update Floors" backURL="../../admin/react_manage_floors.html" />

            <UpdateFloorsForm />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<UpdateFloors />);