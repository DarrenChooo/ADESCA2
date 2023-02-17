/////////////////////////////////////////////////////////////////////
//Linking to dialogues URL
/////////////////////////////////////////////////////////////////////
API_URL = API_URL + '/dialogues';

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import AdminHeader from "./components/AdminHeader";
import UpdateDialogueForm from './components/UpdateDialogueForm';

const UpdateDialogue = () => {

    return (
        <div>
            <AdminHeader pageTitle="Update Dialogue" backURL="../../admin/react_manage_dialogues.html" />

            <UpdateDialogueForm />

        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<UpdateDialogue />);