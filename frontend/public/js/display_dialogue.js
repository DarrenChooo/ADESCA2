/// //////////////////////////////////////////////////////////////////
// Linking to dialogues
/// //////////////////////////////////////////////////////////////////
DIALOGUE_URL = `${API_URL  }/dialogues`;
NPC_URL = `${API_URL  }/npcs`;
IMAGE_URL += '/images/';
USER_URL = `${API_URL  }/users/`;
GAME_URL = `${API_URL  }/games/`;
FLOOR_API_URL = `${API_URL  }/floors/`;
DIALOGUE_STATE_URL = `${API_URL  }/dialogueState`;
GAMEDURATION_URL = `${API_URL  }/gameDuration`;

const today = new Date();
const time = today.getHours().toString() + today.getMinutes().toString();

console.log(time);

/// //////////////////////////////////////////////////////////////////
// Initalize Constant to store DOM Elements
/// //////////////////////////////////////////////////////////////////
const getIntroDialogueButton = document.getElementById("getIntroDialogue");
const dialogueDisplay = document.getElementById("dialogueDisplay");
const backBtn = document.getElementById("backIntroDialogue");
const adminTitle = document.getElementById("adminTitle");
const npcPic = document.getElementById("npcPic");
const choosePlot = document.getElementById("choosePlot");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const getNpcId = urlParams.get('npcid');

// window.localStorage.setItem('userid', 8);
// window.localStorage.setItem('floorid', 1);
const userid = window.localStorage.getItem('userid')
const floorid = window.localStorage.getItem('floorid')

const dialogueid = 1;

/// //////////////////////////////////////////////////////////////////
// Function to GET dialogue by ID
/// //////////////////////////////////////////////////////////////////
window.onload = () => {

    // send axios request to get plotis from user table
    axios.get(`${USER_URL  }/getplotid/${userid}`)
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

    const plotid = window.localStorage.getItem('plotid');

    // axios get request for NPC data   
    axios.get(`${NPC_URL  }/${getNpcId}/${userid}`, {})
        .then((response) => {
            console.log(response.data[0].imageurl);
            localStorage.setItem('npcName', response.data[0].npcname);

            adminTitle.innerHTML = `Conversation with ${response.data[0].npcname}`

            npcPic.innerHTML = `
                    <img class="image" src="${IMAGE_URL + response.data[0].imageurl}" width="100%" height="60%">
                    <figcaption>
                        <h2>${response.data[0].npcname}</h2>
                    </figcaption>
                    `;

            const plotid = window.localStorage.getItem('plotid');
            // axios get request for dialogue data  
            axios.get(`${DIALOGUE_URL  }/display/${getNpcId}/${plotid}`, {})
                .then((response) => {
                    console.log(response.data[0].dialogueid);
                    const dialogueId = response.data[0].dialogueid
                    console.log(getNpcId, dialogueId, userid,plotid)

                    // send axios request to insert into dialogue state table
                    axios.post(`${DIALOGUE_STATE_URL  }/addDialogueState`, {
                        "npcId": parseInt(getNpcId),
                        "dialogueID": parseInt(dialogueId),
                        "userId": parseInt(userid),
                        "plotId": parseInt(plotid),
                        "stateId": 1
                    })

                    // response successful
                    .then((response) => {
                        console.log(response.data)
                        localStorage.setItem('dialogueStateId', 1)
                    })

                    // error response
                    .catch((error) => {
                        console.log(error);
                        alert(error);
                    })



                    console.log(response.data)

                    // user guide instructions for players 
                    // alert("Click Next to start the conversation.");

                    // let dialogueid = response.data[0].dialogueid - 1
                    let dialogueid = 1
                    console.log(dialogueid)

                    // To let first dialogue to auto display instead of needing users to click on next first
                    dialogueDisplay.innerHTML = "";

                    const dialogue = response.data[dialogueid - 1].dialoguedesc;
                    console.log(dialogue)

                    console.log(dialogueid)

                    // Display with animation
                    for (let i = 0; i < dialogue.length; i++) {
                        dialogueDisplay.innerHTML += `<span id='char${i}'>${dialogue.charAt(i)}</span>`;
                    }

                    for (let i = 0; i < dialogue.length; i++) {
                        gsap.fromTo(`#char${i}`, { opacity: 0 }, { delay: i * 0.02, opacity: 1, duration: 0.2 });
                    }

                    // skip animation and display the whole line straight
                    dialogueDisplay.addEventListener("click", () => {
                        dialogueDisplay.innerHTML = dialogue;
                    })


                    getIntroDialogueButton.onclick = () => {

                        // dialogueid will increment every click, which can be used to select the dialogue description index 
                        dialogueid++;

                        // dialogueid 10 is requires an input. if statement to check for id of 10 to display the button for user interaction
                        if (dialogueid === 10) {
                            dialogueDisplay.innerHTML = " "

                            const dialogue = response.data[dialogueid - 1].dialoguedesc;
                            console.log(dialogue)

                            console.log(dialogueid)
                            choosePlot.innerHTML += `
                                <div>   
                                    <button class="choosePlotBtn" id="plot2" type="button">I'm here for a treasure hunt. </button>
                                </div>
                                <div>   
                                    <button class="choosePlotBtn" id="plot3" type="button">I'm looking for my long-lost family. </button>
                                </div>
                                <div>   
                                    <button class="choosePlotBtn" id="plot4" type="button">I'm here for an adventure. </button>
                                </div>
                                    `

                            // Split characters of dialogue and display using loop
                            for (let i = 0; i < dialogue.length; i++) {
                                dialogueDisplay.innerHTML += `<span id='char${i}'>${dialogue.charAt(i)}</span>`;
                            }

                            // Display with delay animation for each character in the dialogue using greensock
                            for (let i = 0; i < dialogue.length; i++) {
                                gsap.fromTo(`#char${i}`, { opacity: 0 }, { delay: i * 0.02, opacity: 1, duration: 0.2 });
                            }


                            // skip animation and display the whole line straight
                            dialogueDisplay.addEventListener("click", () => {
                                dialogueDisplay.innerHTML = dialogue;
                            })

                            // defining constant for plot options
                            const plot2 = document.getElementById("plot2");
                            const plot3 = document.getElementById("plot3");
                            const plot4 = document.getElementById("plot4");

                            // trigger event
                            plot2.onclick = () => {
                                choosePlot.innerHTML = " ";
                                axios.put(`${USER_URL  }/updateplot/${userid}/2`, {})
                                    .then((response) => {
                                        console.log(response.data)
                                        localStorage.setItem('plotid', 2)
                                        window.location.reload();
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        alert(error);
                                    })
                            }

                            // trigger event
                            plot3.onclick = () => {
                                choosePlot.innerHTML = " ";
                                axios.put(`${USER_URL  }/updateplot/${userid}/3`, {})
                                    .then((response) => {
                                        console.log(response.data)
                                        localStorage.setItem('plotid', 3)
                                        window.location.reload();
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        alert(error);
                                    })
                            }

                            // trigger event
                            plot4.onclick = () => {
                                choosePlot.innerHTML = " ";
                                axios.put(`${USER_URL  }/updateplot/${userid}/4`, {})
                                    .then((response) => {
                                        console.log(response.data)
                                        localStorage.setItem('plotid', 4)
                                        window.location.reload();
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        alert(error);
                                    })
                            }
                        }
                        else if (dialogueid <= response.data.length) {

                            dialogueDisplay.innerHTML = "";

                            const dialogue = response.data[dialogueid - 1].dialoguedesc;
                            console.log(dialogue)

                            console.log(dialogueid)

                            // Display with animation
                            for (let i = 0; i < dialogue.length; i++) {
                                dialogueDisplay.innerHTML += `<span id='char${i}'>${dialogue.charAt(i)}</span>`;
                            }

                            for (let i = 0; i < dialogue.length; i++) {
                                gsap.fromTo(`#char${i}`, { opacity: 0 }, { delay: i * 0.02, opacity: 1, duration: 0.2 });
                            }

                            // skip animation and display the whole line straight
                            dialogueDisplay.addEventListener("click", () => {
                                dialogueDisplay.innerHTML = dialogue;
                            })
                        }
                        else {
                            alert(`You have completed the conversation with ${localStorage.getItem('npcName')}`)

                            axios.put(`${DIALOGUE_STATE_URL  }/updateState/${getNpcId}/${userid}`, {
                                "stateId": 2,
                            })

                            // response successful
                            .then((response) => {
                                localStorage.setItem('dialogueStateId', 2)
                            })

                            // error response
                            .catch((error) => {
                                console.log(error);
                                alert(error);
                            })

                            // axios get request for game data
                            axios.get(`${GAME_URL  }${getNpcId}`, {})
                                // response successful
                                .then((response) => {
                                    const gameUrl = response.data.gamename

                                    localStorage.setItem('gameURL', gameUrl)
                                    const gameURL = localStorage.getItem('gameURL')

                                    localStorage.setItem('gameId', response.data.gameid)
                                    const gameId = localStorage.getItem('gameId')

                                    // axios.get(GAMEDURATION_URL + `/gameDuration/${gameId}/${userid}`, {})
                                    // .then((response) => {
                                    //     const getAttempt = response.data[0].attempt;
                                    //     console.log("Current Attempt Count: " + getAttempt)
                                    //     alert("WORKED")

                                    //     axios.post(GAMEDURATION_URL + `/addGameDuration`, {
                                    //         "gameId": gameId, 
                                    //         "timestart": time,
                                    //         "userid": userid, 
                                    //         "attempt": (getAttempt + 1)
                                    //     })
                                    //     .catch((error) => {
                                    //         console.log(error)
                                    //         alert(error)
                                    //     })

                                    // })
                                    // .catch((error) => {
                                    //     console.log(error)
                                    //     alert(error)
                                    // })
                                    

                                    // Do hard coding to check whether the game is react, 
                                    // since some members did not have a react version of their games
                                    // eslint-disable-next-line no-unused-expressions
                                    gameURL === "hangman" ?
                                        window.location.assign(`/user/react_${gameURL}.html`) :
                                        window.location.assign(`/user/${gameURL}.html`)
                                        
                                })
                                // error
                                .catch((error) => {
                                    console.log(error)
                                    alert("Congratulations! You have completed all the games.")
                                    window.location.assign(`/user/react_floor.html`)
                                })
                        }
                    }

                    backBtn.onclick = () => {
                        if (dialogueid === 10) {
                            --dialogueid;
                            dialogueDisplay.innerHTML = "";
                            const dialogue = response.data[dialogueid - 1].dialoguedesc;
                            console.log(dialogue)
                            console.log(dialogueid)

                            choosePlot.innerHTML += `
                                <div>   
                                    <button id="plot2" type="button">I'm here for a treasure hunt. </button>
                                </div>
                                <div>   
                                    <button id="plot3" type="button">I'm looking for my long-lost family. </button>
                                </div>
                                <div>   
                                    <button id="plot4" type="button">I'm here for an adventure. </button>
                                </div>
                                    `
                            const plot2 = document.getElementById("plot2");
                            const plot3 = document.getElementById("plot3");
                            const plot4 = document.getElementById("plot4");

                            // Display with animation
                            for (var i = 0; i < dialogue.length; i++) {
                                dialogueDisplay.innerHTML += `<span id='char${i}'>${dialogue.charAt(i)}</span>`;
                            }

                            for (var i = 0; i < dialogue.length; i++) {
                                gsap.fromTo(`#char${i}`, { opacity: 0 }, { delay: i * 0.02, opacity: 1, duration: 0.2 });
                            }

                            // skip animation and display the whole line straight
                            dialogueDisplay.addEventListener("click", () => {
                                dialogueDisplay.innerHTML = dialogue;
                            })

                        }
                        else if (dialogueid <= response.data.length) {

                            --dialogueid;
                            dialogueDisplay.innerHTML = "";
                            const dialogue = response.data[dialogueid - 1].dialoguedesc;
                            console.log(dialogue)
                            console.log(dialogueid)

                            // Display with animation
                            for (var i = 0; i < dialogue.length; i++) {
                                dialogueDisplay.innerHTML += `<span id='char${i}'>${dialogue.charAt(i)}</span>`;
                            }

                            for (var i = 0; i < dialogue.length; i++) {
                                gsap.fromTo(`#char${i}`, { opacity: 0 }, { delay: i * 0.02, opacity: 1, duration: 0.2 });
                            }

                            // skip animation and display the whole line straight
                            dialogueDisplay.addEventListener("click", () => {
                                dialogueDisplay.innerHTML = dialogue;
                            })
                        }
                        else {
                            alert(`You have completed the conversation with ${localStorage.getItem('npcName')}`)

                            axios.get(`${GAME_URL  }${getNpcId}`, {})
                                .then((response) => {
                                    const gameUrl = response.data.gamename
                                    localStorage.setItem('gameURL', gameUrl)
                                    const gameURL = localStorage.getItem('gameURL')

                                    // Do hard coding to check whether the game is react, 
                                    // since some members did not have a react version of their games
                                    // eslint-disable-next-line no-unused-expressions
                                    gameURL === "hangman" ?
                                        window.location.assign(`/user/react_${gameURL}.html`) :
                                        window.location.assign(`/user/${gameURL}.html`)
                                })
                                .catch((error) => {
                                    console.log(error)
                                })
                        }
                    }




                })
                .catch((error) => {
                    console.log(error);
                    alert(error);
                })



        })
        .catch((error) => {
            console.log(error);
            alert(error);
        })


}
