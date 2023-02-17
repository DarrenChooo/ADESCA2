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
import DeleteNpcContent from './components/DeleteNpcContent';

/////////////////////////////////////////////////////////////////////
//Getting npc id from the URL
/////////////////////////////////////////////////////////////////////
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let getNpcId = urlParams.get('npcid');

const DeleteNpc = () => {
    const [npc, setNpc] = React.useState([]);
    const [npcName, setNpcName] = React.useState([]);

    React.useEffect(() => {
        // console.log(getNpcId)

        // axios get request for NPC data   
        axios.get(API_URL + `/${getNpcId}`, {})

            // response successful
            .then((response) => {
                // console.log(response.data);
                setNpc(response.data);
                setNpcName(response.data[0].npcname)
            })
            .catch((error) => {
                console.log(error);
                
            });
    })

    return (
        <div>
            <AdminHeader pageTitle="Delete NPC Confirmation" backURL={"../../admin/react_view_npc.html?npcid=" + getNpcId} />

            <h2 id="confirmation">
                Are you sure you want to delete {npcName} from the database?
                <br /><br />
                This step is irreversible.
            </h2>

            <DeleteNpcContent npc={npc} />

        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<DeleteNpc />);