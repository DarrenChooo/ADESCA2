/////////////////////////////////////////////////////////////////////
//Linking to NPC and Image URL
/////////////////////////////////////////////////////////////////////
API_URL = API_URL + '/npcs';
IMAGE_URL = IMAGE_URL + '/images/';

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import AdminNavBar from "./components/AdminNavBar";
import AdminSearchBar from "./components/AdminSearchBar";
import RetrieveNpcs from './components/RetrieveNpcs';

const ManageNpcs = () => {
    const [npcs, setNpcs] = React.useState([]);

    React.useEffect(() => {
        // send axios request to get all npcs
        axios.get(API_URL, {})

            // response successful
            .then((response) => {
                // console.log(response.data);
                setNpcs(response.data);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

        // add event listener for search bar
        searchInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();

                // send axios request to get all npcs that contains the keyword input
                axios.get(API_URL + `/search/${searchInput.value}`, {})

                    // response successful
                    .then((response) => {
                        // console.log(response.data.rows[0]);
                        setNpcs(response.data.rows);
                    })
                    .catch((error) => {
                        console.log(error);
                        alert(error);
                    });
            }
        });
    }, [])

    return (
        <div>
            <AdminNavBar pageTitle="NPC Manager" />
            <br />
            <br />
            <br />

            <div className="bodyContainer">
                <div className="flexContainer">
                    <AdminSearchBar addURL="/admin/react_add_npc.html" />

                    <RetrieveNpcs npcs={npcs} />

                </div>
            </div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ManageNpcs />);