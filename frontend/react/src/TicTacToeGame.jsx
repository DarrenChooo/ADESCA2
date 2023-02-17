/////////////////////////////////////////////////////////////////////
//Linking to floors and images url
/////////////////////////////////////////////////////////////////////
const FLOOR_URL = API_URL + '/floors/';
IMAGE_URL = IMAGE_URL + '/images/';

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import TicTacToeContent from './components/TicTacToeContent';

const TicTacToeGame = () => {
    const [startTime, setStartTime] = useState(Date.now())

    return (
        <div>

            <div id="header">
                <h1>TIC TAC TOE GAME</h1>
            </div>

            <TicTacToeContent startTime={startTime} setStartTime={setStartTime}/>

        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<TicTacToeGame />);