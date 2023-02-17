/////////////////////////////////////////////////////////////////////
//Linking to NPC and Image URL
/////////////////////////////////////////////////////////////////////
API_URL = API_URL + '/npcs';
IMAGE_URL = IMAGE_URL + '/images/';

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import AdminHeader from "./components/AdminHeader";
import UpdateNpcForm from './components/UpdateNpcForm';

const UpdateNpc = () => {

    return (
        <div>
            <AdminHeader pageTitle="Update NPC" backURL="../../admin/react_manage_npcs.html" />

            <UpdateNpcForm />

        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<UpdateNpc />);