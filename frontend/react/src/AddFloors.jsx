/////////////////////////////////////////////////////////////////////
//Linking to Floors and Image URL
/////////////////////////////////////////////////////////////////////
API_URL = API_URL + '/floors/';
IMAGE_URL = IMAGE_URL + '/images/';

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React,  { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import AdminHeader from "./components/AdminHeader";
import AddFloorForm from "./components/AddFloorForm";
import ErrorPage from "./components/ErrorPage";

const AddFloors = () => {
    // For error handling
    const [error, setError] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [errorData, setErrorData] = React.useState("")

    return (
        <>
            { error ? (
                <ErrorPage setErrorMessage={errorMessage} setErrorData={errorData}/>
            ) : (
                <div>
                    <AdminHeader pageTitle="Add Floor" backURL="../../admin/react_manage_floors.html" />
                    <AddFloorForm setError={setError} setErrorMessage={setErrorMessage} setErrorData={setErrorData}/>
                </div>
            )}
        </>
    )

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AddFloors />);