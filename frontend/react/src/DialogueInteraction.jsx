/////////////////////////////////////////////////////////////////////
//Linking to dialogues
/////////////////////////////////////////////////////////////////////
const NPC_URL = API_URL + '/npcs';
IMAGE_URL = IMAGE_URL + '/images/';
const USER_URL = API_URL + '/users/';
const FLOOR_API_URL = API_URL + '/floors/';

/////////////////////////////////////////////////////////////////////
// Initalize Constants
/////////////////////////////////////////////////////////////////////
// window.localStorage.setItem('userid', 11);
// window.localStorage.setItem('floorid', 1);
const userid = window.localStorage.getItem('userid')
const floorid = window.localStorage.getItem('floorid')

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const getNpcId = urlParams.get('npcid');

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import DialogueInteractionContent from "./components/DialogueInteractionContent";
import AddNpcForm from './components/AddNpcForm';

const DialogueInteraction = () => {
    const [npcName, setNpcName] = React.useState("");
    const [npcImageUrl, setNpcImageUrl] = React.useState("");

    React.useEffect(() => {

        // send axios request to get plotis from user table
        axios.get(USER_URL + `/getplotid/${userid}`)
            .then((response) => {
                console.log(response.data[0].plotid)
                localStorage.setItem('plotid', response.data[0].plotid);

            })
            // response successful
            .then(() => {
                console.log(floorid)
                axios.get(FLOOR_API_URL + floorid, {})
                    .then((floor) => {
                        document.body.style.backgroundImage = `url('${IMAGE_URL + floor.data.imageurl}')`;
                    })
                    .catch((err) => {
                        console.log(err);
                        alert(err);
                    })
            })
            // error
            .catch((error) => {
                console.log(error);
                alert(error);
            })

        let plotid = window.localStorage.getItem('plotid');

        axios.get(NPC_URL + `/${getNpcId}`, {})
            .then((response) => {
                console.log(response.data[0].imageurl);
                localStorage.setItem('npcName', response.data[0].npcname);

                setNpcName(response.data[0].npcname);
                setNpcImageUrl(response.data[0].imageurl);

                let plotid = window.localStorage.getItem('plotid');
                
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            })

    }, [])

    return (
        <div>

            <div id="header">
                <h1>Conversation with {npcName}</h1>
            </div>

            <DialogueInteractionContent npcName={npcName} npcImageUrl={npcImageUrl} />



        </div>

    )

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<DialogueInteraction />);