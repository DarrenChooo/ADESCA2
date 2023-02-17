//Linking to NPC
const NPC_URL = API_URL + '/npcs/';

//Linking to Games
const GAME_URL = API_URL + '/games/';

//Linking to Users
const USER_URL = API_URL + '/users/';

//Linking to Images
const API_IMAGE_URL = API_URL + '/image/';

//Linking to Image file directory
const IMAGES_URL = IMAGE_URL + '/images/';

//Importing PixiJS Styles
const Filter = new PIXI.filters.ColorMatrixFilter();
const TextStyle = PIXI.TextStyle;

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import UserProfile from "./components/UserProfile";
import GameBarButtons from "./components/GameBarButtons";
import GameBackgroundImage from "./components/GameBackgroundImage";
import LoadingSpinner from "./components/LoadingSpinner";
import AllFloors from "./components/AllFloors";
import ErrorPage from "./components/ErrorPage";
import useDidMountEffect from "./components/useDidMountEffect";

const UserFloor = () => {
    const [floorId, setFloorId] = React.useState(null);
    const [userImageUrl, setUserImageUrl] = React.useState(null);
    const [npcImageUrl, setNpcImageUrl] = React.useState(window.localStorage.getItem('npcImageURL'));
    const [playerUsername, setPlayerUsername] = React.useState("");
    const [playerId, setPlayerId] = React.useState("");

    // For users in the lobby
    const [playerUsernameArray, setPlayerUsernameArray] = React.useState([]);
    const [playerStatusArray, setPlayerStatusArray] = React.useState([]);
    const [playerLastLoggedArray, setPlayerLastLoggedArray] = React.useState([]);
    const [NPCImageUrlArray, setNPCImageUrlArray] = React.useState([]);

    // For game status 
    const [gameStatus, setGameStatus] = React.useState("")

    // For loading page
    const [loadingWords, setLoadingWords] = React.useState("");

    // For replaying floors
    const [selectedFloor, setSelectedFloor] = React.useState(false)

    // For error handling
    const [error, setError] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    // For NPC Dialgoue State
    const [npcDialogueState, setNpcDialogueState] = React.useState(0)

    useDidMountEffect(() => {
        axios({
            method: 'get',
            url: NPC_URL + floorId + `/${playerId}`
        })
            .then((response) => {

                console.log(response)

                localStorage.setItem('npcImageURL', response.data[0].imageurl)
                localStorage.setItem('npcId', response.data[0].npcid)
                localStorage.setItem('dialogueStateId', response.data[0].stateid)

                const dialogueStateId = window.localStorage.getItem('dialogueStateId')
                setNpcImageUrl(window.localStorage.getItem('npcImageURL'))

                setNpcDialogueState(parseInt(dialogueStateId))
            
                //Get npcId from localStorage
                const npcId = localStorage.getItem('npcId')
                //Get Game Details  
                axios({
                    method: 'get',
                    url: GAME_URL + npcId 
                })
                    .then((response) => {
                        localStorage.setItem('gameURL', response.data.gamename)
                    })
                    .catch((error) => {
                        setError(true)
                setErrorMessage(error.response.status)
                    })
            })
            .catch((error) => {
                setError(true)
            setErrorMessage(error.response.status)
            })
    }, [floorId])

    // Get all usernames in the current floor
    useDidMountEffect(() => {
        axios({
            method: 'get',
            url: USER_URL + `floors/${floorId}`
        })
            .then((response) => {
                const usernameArr = []
                const statusArr = []
                const lastLoggedArr = []
                response.data.map((value) => {
                    if (value.username != playerUsername) {
                        usernameArr.push(value.username)
                        statusArr.push(value.userstatus)
                        lastLoggedArr.push((value.lastloggedin).split('.')[0])
                    }
                })

                setPlayerUsernameArray(usernameArr)
                setPlayerStatusArray(statusArr)
                setPlayerLastLoggedArray(lastLoggedArr)
            })
            .catch((error) => {
                setError(true)
            setErrorMessage(error.response.status)
            })
    }, [userImageUrl, npcImageUrl])

    // Get all npc imageurls
    useDidMountEffect(() => {
        axios({
            method: 'get',
            url: API_IMAGE_URL + `all/npc`
        })
            .then((response) => {
                const npcArr = []
                response.data.map((value) => (
                    npcArr.push(value.imageurl)
                ))
                setNPCImageUrlArray(npcArr)
            })
            .catch((error) => {
                setError(true)
            setErrorMessage(error.response.status)
            })
    }, [playerUsernameArray])

    useDidMountEffect(() => {
        document.body.removeChild(document.body.lastChild)

        // PixiJS Canvas Size
        const app = new PIXI.Application({
            width: 1540,
            height: 620,
            transparent: true,
        })

        document.body.appendChild(app.view);

        // PixiJS Container
        const container = new PIXI.Container();
        app.stage.addChild(container);

        // Player Object
        const texture = PIXI.Texture.from("../images/" + userImageUrl);
        const player = new PIXI.Sprite(texture);
        container.addChild(player);

        //Player Size
        player.scale.x = 1.5
        player.scale.y = 1.5

        //Player Position
        player.position.set(150, 430)

        let npcImageURL = localStorage.getItem('npcImageURL')

        // NPC Object
        const texture2 = PIXI.Texture.from("../images/" + npcImageURL);
        const npc = new PIXI.Sprite(texture2);
        container.addChild(npc);

        //NPC Size
        npc.scale.x = 0.4
        npc.scale.y = 0.4

        //NPC Position
        npc.position.set(1200, 390)

        let npcAlert
        // NPC Alert Object
        if (npcDialogueState == 2) {
            npcAlert = PIXI.Sprite.from(`../images/completedDialogueStateImage.png`)
            npcAlert.scale.set(0.225,0.225)
        } 
        else if (npcDialogueState == 1) {
            npcAlert = PIXI.Sprite.from(`../images/ongoingDialogueStateImage.png`)
            npcAlert.scale.set(0.205,0.205)
        }  
        else {
            npcAlert = PIXI.Sprite.from(`../images/notStartedDialogueStateImage.png`)
            npcAlert.scale.set(0.55, 0.55)
        }
        npcAlert.position.set(1263 , 300)

        container.addChild(npcAlert)

        // Border Object
        const rect = new PIXI.Graphics()
        rect.beginFill(0, 0.1);

        // Draw a rectangle
        rect.drawRect(-100, 400, 100, 200);
        container.addChild(rect);

        // PixiJS lobby container
        const lobbyContainer = new PIXI.Container();
        app.stage.addChild(lobbyContainer);

        const style = new TextStyle({
            fontFamily: 'Montserrat',
            fontSize: 20,
            fill: 'white',
        });

        // For every player in current floor, display them in the lobby
        playerUsernameArray.map((value, index) => {

            // Generate random number from 0 to NPCs Array length
            let randomNPCNumber = Math.floor(Math.random() * NPCImageUrlArray.length)

            // Create new PixiJS Child with penguin photo
            const lobbyPlayerTexture = PIXI.Texture.from("../images/" + NPCImageUrlArray[randomNPCNumber]);
            const players = new PIXI.Sprite(lobbyPlayerTexture);

            // Add child into PixiJS Container
            lobbyContainer.addChild(players);

            // Scale players
            players.scale.x = 0.23
            players.scale.y = 0.23

            // Generate random number for X axis
            let randomXAxis = Math.floor(Math.random() * 1150) + 100

            // Generate random number for X axis
            let randomYAxis = Math.floor(Math.random() * 170) + 70

            // Assign PIXI Graphics to a variable
            const circle = new PIXI.Graphics()

            // Get Current Time
            const currentTime = (new Date()).toISOString().split('.')[0]

            // Convert ISO Date into milliseconds
            const start = new Date(currentTime).getTime();
            const end = new Date(playerLastLoggedArray[index]).getTime();

            // Get difference between current time and last logged in time
            const milliseconds = Math.abs(end - start).toString()
            const playerSeconds = parseInt(milliseconds / 1000);

            // Conditional check to see whether player is offline for more than 24hours
            if (playerStatusArray[index] == "offline" && playerSeconds > 86400) {
                // Red circle - Offline
                circle.beginFill(0xd91507)
            } else if (playerStatusArray[index] == "offline" && playerSeconds < 86400) {
                // Orange circle - Away
                circle.beginFill(0xffb22e)
            } else {
                // Green circle - Online
                circle.beginFill(0x4ddb00)
            }

            // Draw circle to show status of user's activity
            circle.drawCircle(randomXAxis + 30, randomYAxis - 6.5, 6)
            lobbyContainer.addChild(circle);

            // Set players' position
            players.position.set(randomXAxis, randomYAxis)

            // Set players' username 
            let name = new PIXI.Text(value, style)
            lobbyContainer.addChild(name)

            // Set players username position
            name.position.set(randomXAxis + 47, randomYAxis - 19)
        })

        // Keyboard Event Listener
        window.addEventListener("keydown", keyDown)
        window.addEventListener("keyup", keyUp)

        app.ticker.add(gameLoop)

        let keys = {}

        function keyDown(event) {
            keys[event.keyCode] = true
        }

        function keyUp(event) {
            keys[event.keyCode] = false
        }

        function gameLoop() {
            //Keyboard Input 'D'
            if (keys["68"]) {
                player.x += 5;
            }

            //Keyboard Input 'S'
            if (keys["65"]) {
                player.x -= 5;
            }

            // If Player and NPC intersect
            if (intersect(player, npc)) {
                localStorage.setItem('userid', playerId)
                setGameStatus("waiting")
                setLoadingWords("Gathering NPC Dialogues...")
                player.x = 0
            }

            // If Player and Border intersect
            if (intersect(player, rect)) {
                player.x += 5
                player.position.x = 40
            }
        }

        function intersect(a, b) {
            let aBox = a.getBounds()
            let bBox = b.getBounds()

            return aBox.x + aBox.width > bBox.x &&
                aBox.x < bBox.x + bBox.width &&
                aBox.y < aBox.height + bBox.y &&
                aBox.y < bBox.y + bBox.height
        }

        // Implementing sprite animations using PixiJS Filters
        let count = 0
        requestAnimationFrame(animate);

        function animate() {
            player.scale.x += Math.sin(count) * 0.0017;
            player.scale.y += Math.cos(count) * 0.0035;
            lobbyContainer.scale.x += Math.sin(count) * 0.00009;
            lobbyContainer.scale.y += Math.sin(count) * 0.00021;
            npcAlert.scale.y += Math.cos(count) * 0.001;

            count += 0.1;

            var matrix = Filter.matrix;

            matrix[1] = Math.sin(count) * 3;
            matrix[2] = Math.cos(count);
            matrix[3] = Math.cos(count) * 1.5;
            matrix[4] = Math.sin(count / 3) * 2;
            matrix[5] = Math.sin(count / 2);
            matrix[6] = Math.sin(count / 4);

            requestAnimationFrame(animate);
        }

    }, [NPCImageUrlArray])

    useDidMountEffect(() => {
        // Get user's info with userid
        axios({
            method: 'get',
            url: API_URL + `/users/join/${playerId}`,
        })
        .then((response) => {
        })
        .catch((error) => {
            console.log(error)
        })

    }, [gameStatus])

    // Check user if they are ready
    useDidMountEffect(() => {
        document.body.removeChild(document.body.lastChild)
        setTimeout(() => {
            setGameStatus('not ready')
        }, 2000)
    }, [gameStatus])

    function loadNpc() {
        //Get npcId from localStorage
        const npcId = localStorage.getItem('npcId')

        // Redirect users to respective game with npc details
        window.location.href = `/user/dialogue_interaction.html?npcid=${npcId}`
    }

    return (
        <> 
            { error ? (
                <ErrorPage setErrorMessage={errorMessage} />
            ) :  selectedFloor ? (
                <AllFloors setFloorId={setFloorId} setSelectedFloor={setSelectedFloor} setError={setError}/> 
            ) : (
            <div className="topBar">
                <UserProfile setPlayerUsername={setPlayerUsername} setPlayerId={setPlayerId} floorId={floorId} setFloorId={setFloorId} setUserImageUrl={setUserImageUrl} setError={setError}/>
                <GameBarButtons setSelectedFloor={setSelectedFloor}/>
                <GameBackgroundImage floorId={floorId} setError={setError}/>
                { gameStatus == 'waiting' ? 
                    <div className="overlay">
                        <div className="playerCtn">
                            <LoadingSpinner setLoadingWords={loadingWords}/>
                        </div>
                    </div>      
                : gameStatus == 'not ready' ? 
                    <div className="overlay">
                        <div className="playerCtn">
                            <button onClick={loadNpc} className="readyButton" type="button">Ready?</button> 
                            <img src={IMAGES_URL + 'char.png'}></img>
                        </div>
                    </div>      
                    : null 
                }
            </div>
            )}
        </>
    )
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<UserFloor />);