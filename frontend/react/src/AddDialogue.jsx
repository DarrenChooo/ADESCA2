/////////////////////////////////////////////////////////////////////
//Linking to dialogue URL
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
import AddDialogueForm from './components/AddDialogueForm';

const AddDialogue = () => {

    return (
        <div>
            <AdminHeader pageTitle="Add Dialogue" backURL="../../admin/react_manage_dialogues.html" />

            <AddDialogueForm />

        </div>
    )

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AddDialogue />);