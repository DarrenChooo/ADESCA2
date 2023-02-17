/// //////////////////////////////////////////////////////////////////
// Linking to npcs, users, floors, currency, and images url
/// //////////////////////////////////////////////////////////////////
NPC_URL = `${API_URL  }/npcs`;
FLOOR_URL = `${API_URL  }/floors/`;
USER_URL = `${API_URL  }/users/`;
IMAGE_URL += '/images/';
CURRENCY_URL = `${API_URL  }/currency/`;

/// //////////////////////////////////////////////////////////////////
// Initalize Constant to store DOM Elements
/// //////////////////////////////////////////////////////////////////
const board = document.getElementById("board");
const whosTurn = document.getElementById("whosTurn");
const box0 = document.getElementById("0");
const box1 = document.getElementById("1");
const box2 = document.getElementById("2");
const box3 = document.getElementById("3");
const box4 = document.getElementById("4");
const box5 = document.getElementById("5");
const box6 = document.getElementById("6");
const box7 = document.getElementById("7");
const box8 = document.getElementById("8");
const pic = document.getElementById("pic");


const userid = localStorage.getItem('userid')
const getNpcId = localStorage.getItem('npcId')

/// //////////////////////////////////////////////////////////////////
// Initalize variables used for the game
/// //////////////////////////////////////////////////////////////////

const user = [1, 'X']; // [playerNumber, symbol]
const comp = [2, 'O'];

const tileNum = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const winCombi = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 1, 2],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentPlayer;

let userTiles = [];

let compTiles = [];

let boardArr = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];

let winner = 0;

let turnCount = 1;

// Message on who is currently choosing the box
whosTurn.innerHTML = `It's your turn!`;

axios.get(`${USER_URL  }join/${  userid}`, {})
    .then((response) => {
        localStorage.setItem('floorid', response.data.floorid)
        pic.innerHTML = `
            <h2 id="playerName">${response.data.username}</h2>
            <img src="${IMAGE_URL + response.data.userimageurl}" id="player">
        `

        return response.data
    })
    .then((response) => {
        axios.get(FLOOR_URL + response.floorid, {})
            .then((floor) => {
                document.body.style.backgroundImage = `url('${IMAGE_URL + floor.data.imageurl}')`;
            })
            .catch((err) => {
                console.log(err);
                alert(err);
            })
    })
    .catch((err) => {
        console.log(err);
        alert(err);
    })

/// //////////////////////////////////////////////////////////////////
// Listen for clicked boxes for user's choice
/// //////////////////////////////////////////////////////////////////
box0.addEventListener("click", () => {
    // alert(tileNum[0]);
    userTurn(tileNum[0], box0);
    
})

box1.addEventListener("click", () => {
    userTurn(tileNum[1], box1);
    
})

box2.addEventListener("click", () => {
    userTurn(tileNum[2], box2);
    
})

box3.addEventListener("click", () => {
    userTurn(tileNum[3], box3);
    
})

box4.addEventListener("click", () => {
    userTurn(tileNum[4], box4);
    
})

box5.addEventListener("click", () => {
    userTurn(tileNum[5], box5);
    
})

box6.addEventListener("click", () => {
    userTurn(tileNum[6], box6);
    
})

box7.addEventListener("click", () => {
    userTurn(tileNum[7], box7);
    
})

box8.addEventListener("click", () => {
    userTurn(tileNum[8], box8);
    
})

/// //////////////////////////////////////////////////////////////////
// Listen for boxes hovered for hover effect
/// //////////////////////////////////////////////////////////////////
box0.addEventListener("mouseover", () => {
    // alert("HOVERED")
    const pos = 0;

    // checks if square is empty using board array, if it is empty, changes mouse to crosshair when hovering
    if (boardArr[pos] == "#") {
        box0.style.cursor = "crosshair"
    }
    
})

box1.addEventListener("mouseover", () => {
    // alert("HOVERED")
    const pos = 1;

    // checks if square is empty using board array, if it is empty, changes mouse to crosshair when hovering
    if (boardArr[pos] == "#") {
        box1.style.cursor = "crosshair"
    }
    
})

box2.addEventListener("mouseover", () => {
    // alert("HOVERED")
    const pos = 2;

    // checks if square is empty using board array, if it is empty, changes mouse to crosshair when hovering
    if (boardArr[pos] == "#") {
        box2.style.cursor = "crosshair"
    }
    
})

box3.addEventListener("mouseover", () => {
    // alert("HOVERED")
    const pos = 3;

    // checks if square is empty using board array, if it is empty, changes mouse to crosshair when hovering
    if (boardArr[pos] == "#") {
        box3.style.cursor = "crosshair"
    }
    
})

box4.addEventListener("mouseover", () => {
    // alert("HOVERED")
    const pos = 4;

    // checks if square is empty using board array, if it is empty, changes mouse to crosshair when hovering
    if (boardArr[pos] == "#") {
        box4.style.cursor = "crosshair"
    }
    
})

box5.addEventListener("mouseover", () => {
    // alert("HOVERED")
    const pos = 5;

    // checks if square is empty using board array, if it is empty, changes mouse to crosshair when hovering
    if (boardArr[pos] == "#") {
        box5.style.cursor = "crosshair"
    }
    
})

box6.addEventListener("mouseover", () => {
    // alert("HOVERED")
    const pos = 6;

    // checks if square is empty using board array, if it is empty, changes mouse to crosshair when hovering
    if (boardArr[pos] == "#") {
        box6.style.cursor = "crosshair"
    }
    
})

box7.addEventListener("mouseover", () => {
    // alert("HOVERED")
    const pos = 7;

    // checks if square is empty using board array, if it is empty, changes mouse to crosshair when hovering
    if (boardArr[pos] == "#") {
        box7.style.cursor = "crosshair"
    }
    
})

box8.addEventListener("mouseover", () => {
    // alert("HOVERED")
    const pos = 8;

    // checks if square is empty using board array, if it is empty, changes mouse to crosshair when hovering
    if (boardArr[pos] == "#") {
        box8.style.cursor = "crosshair"
    }
    
})

/// //////////////////////////////////////////////////////////////////
// Game logic
/// //////////////////////////////////////////////////////////////////
const userTurn = (tile, element) => {
    console.log(turnCount)
    if (turnCount % 2 !== 0) {

        const currentPlayer = user;
        element.innerHTML = `${currentPlayer[1]}`;
        boardArr[tile] = user[1];
        console.log(`board tile ${boardArr}`);

        checkWin(currentPlayer);

        if (winner === currentPlayer[0]) {
            alert("Congrats, you have won and earned 100 Stardust!");
            whosTurn.innerHTML = `Congrats, you have won and earned 100 Stardust!`;
            // to give currency and move on to next floor when user wins the game
            axios.get(CURRENCY_URL + userid, {})
                .then((response) => {

                    const updatedCurrency = response.data[0].quantity + 100;

                    axios.put(CURRENCY_URL + userid, {
                        quantity: updatedCurrency
                    })
                        .then(() => {
                            console.log('Currency has been added!');
                        })
                        .catch((err) => {
                            console.log(err);
                            alert(err);
                        })

                })
                .catch((err) => {
                    console.log(err);
                    alert(err);
                })


            const getFloorId = localStorage.getItem('floorid')
            axios.put(`${USER_URL  }/floor/${userid}`, { floorid: Number(getFloorId) + 1 })
                .then(() => {
                    localStorage.setItem('floorid', Number(getFloorId) + 1)
                })
                .catch((err) => {
                    console.log(err)
                })

            window.location.assign(`/user/floor.html`)
        }
        else {
            turnCount++;
            console.log(turnCount)
            checkDraw();

            if (turnCount % 2 === 0) {
                axios.get(`${NPC_URL  }/${getNpcId}`, {})
                    .then((response) => {
                        console.log(response.data[0].imageurl);
                        localStorage.setItem('npcName', response.data[0].npcname);

                        whosTurn.innerHTML = `It's ${response.data[0].npcname} turn!`;

                        pic.innerHTML = `
                            <h2 id="playerName">${response.data[0].npcname}</h2>
                            <img src="${IMAGE_URL + response.data[0].imageurl}" id="player">
                        `
                    })

                setTimeout(compTurn, 1200);
                
            }

        }
    }

}

const compTurn = () => {
    if (turnCount % 2 === 0) {

        whosTurn.innerHTML = `It's Clyde's turn!`;

        const currentPlayer = comp;
        const compChoice = pickEmpty();

        document.getElementById(`${compChoice}`).innerHTML = `${currentPlayer[1]}`;

        boardArr[compChoice] = comp[1];
        console.log(`board tile ${boardArr}`);
        console.log(currentPlayer)

        checkWin(currentPlayer);

        if (winner === currentPlayer[0]) {
            alert("You lost the game. Better luck next time!");
            whosTurn.innerHTML = `You lost the game. Better luck next time!`;
            resetGame();
        }
        else {
            turnCount++;
            console.log(turnCount)
            checkDraw();
        }
    }

    whosTurn.innerHTML = `It's your turn!`;

    axios.get(`${USER_URL  }join/${  userid}`, {})
        .then((user) => {
            localStorage.setItem('floorid', user.data.floorid)
            pic.innerHTML = `
            <h2 id="playerName">${user.data.username}</h2>
            <img src="${IMAGE_URL + user.data.userimageurl}" id="player">
        `

            return user.data
        })
        .then((user) => {
            axios.get(FLOOR_URL + user.floorid, {})
                .then((floor) => {
                    document.body.style.backgroundImage = `url('${IMAGE_URL + floor.data.imageurl}')`;
                })
                .catch((err) => {
                    console.log(err);
                    alert(err);
                })
        })
        .catch((err) => {
            console.log(err);
            alert(err);
        })

    
}

/// //////////////////////////////////////////////////////////////////
// pickEmpty function, used for computers turn to pick a random empty square.
/// //////////////////////////////////////////////////////////////////
const pickEmpty = () => {
    const emptyTilesArr = [];
    for (j = 0; j < boardArr.length; j++) {
        if (boardArr[j] === '#') {
            emptyTilesArr.push(j);
        }
    }

    const randomGenerator = Math.round(Math.random() * emptyTilesArr.length);
    console.log(`comp choice: ${randomGenerator}`);

    let choice = emptyTilesArr[randomGenerator];

    if (choice === undefined) {
        choice = emptyTilesArr[randomGenerator - 1];
    }

    return choice;
}

const checkWin = (currentPlayer) => {
    if (currentPlayer[0] === 1) {
        currentTiles = userTiles;
    }
    else if (currentPlayer[0] === 2) {
        currentTiles = compTiles;
    }

    // compile array of all tiles taken by the current player
    for (i = 0; i < boardArr.length; i++) {
        if (boardArr[i] === currentPlayer[1]) {
            currentTiles.push(i);
        }
    }
    console.log(`Player ${currentPlayer[0]}: ${currentTiles}`)

    // Check the current tiles array agains each winning combinations to find a match.
    for (x = 0; x < winCombi.length; x++) {
        let count = 0;
        for (y = 0; y < winCombi[x].length; y++) {
            if (currentTiles.indexOf(winCombi[x][y]) != -1) {
                count++;
            }

            if (count == 3) {
                winner = currentPlayer[0];
            }
        }
    }
    
}

const checkDraw = () => {
    if (turnCount > 8) {
        alert("It's a Draw!");
        whosTurn.innerHTML = `It's a Draw!`;
        resetGame();
    }
}

const resetGame = () => {
    turnCount = 1;
    boardArr = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];
    winner = 0;
    userTiles = [];
    compTiles = [];
    whosTurn.innerHTML = `It's your turn!`;

    for (z = 0; z < tileNum.length; z++) {
        document.getElementById(`${tileNum[z]}`).innerHTML = '';
    };
}