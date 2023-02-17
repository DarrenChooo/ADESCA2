/////////////////////////////////////////////////////////////////////
//Linking to dialogue URL
/////////////////////////////////////////////////////////////////////
API_URL = API_URL + '/inventory/';
IMAGE_URL = IMAGE_URL + '/images/';


/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import InventoryHeader from './components/InventoryHeader';
import UpdateInventoryForm from './components/UpdateInventoryForm';

const InventoryItem = () => {
    return (
        <div>
            <InventoryHeader backURL="/user/react_inventory.html"/>
            <UpdateInventoryForm />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<InventoryItem />);