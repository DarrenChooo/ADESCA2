/////////////////////////////////////////////////////////////////////
//Linking to dialogue URL
/////////////////////////////////////////////////////////////////////
API_URL = API_URL + '/currency';

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import AdminHeader from "./components/AdminHeader";
import UpdateCurrencyForm from './components/UpdateCurrencyForm';

const UpdateCurrency = () => {

    return (
        <div>
            <AdminHeader pageTitle="Update Currency" backURL="../../admin/react_manage_currency.html" />
            <div className="container">
                <div className="flexCtn">
                    <UpdateCurrencyForm />
                </div>
            </div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<UpdateCurrency />);