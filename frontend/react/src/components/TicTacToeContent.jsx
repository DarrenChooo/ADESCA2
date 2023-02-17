/////////////////////////////////////////////////////////////////////
// Linking to users, floors, and currency url
/////////////////////////////////////////////////////////////////////
const CURRENCY_URL = API_URL + '/currency/';
const USER_URL = API_URL + '/users/';
const FLOOR_URL = API_URL + '/floors/';
const GAMEDURATION_URL = API_URL + '/gameDuration';

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useEffect } from "react";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import TicTacToePlayerTurn from './TicTacToePlayerTurn';
import TicTacToeBoardCell from './TicTacToeBoardCell';
import TicTacToePlayerPic from './TicTacToePlayerPic';

const userid = localStorage.getItem('userid');

/////////////////////////////////////////////////////////////////////
// A players object to hold the player's symbol
/////////////////////////////////////////////////////////////////////
const Players = {
    Human: {
        symbol: "X",

    },
    Computer: {
        symbol: "O",

    },

};

export default function TicTacToeContent({ startTime, setStartTime }) {
    // Set the initial player to be the human
    const [turn, setTurn] = React.useState(Players.Human.symbol);
    const [cells, setCells] = React.useState(Array(9).fill(""));
    const [winner, setWinner] = React.useState();

    // This functions return true if there is a winner, and false if there is no winner
    const checkWin = (squares) => {
        let combos = {

            across: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],

            ],

            down: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],

            ],

            diagonal: [
                [0, 4, 8],
                [2, 4, 6],

            ],

        };

        for (let combo in combos) {

            combos[combo].forEach((pattern) => {

                if (
                    squares[pattern[0]] === "" ||
                    squares[pattern[1]] === "" ||
                    squares[pattern[2]] === ""

                ) {
                    // do nothing
                    return false;

                }
                else if (
                    squares[pattern[0]] === squares[pattern[1]] &&
                    squares[pattern[1]] === squares[pattern[2]]

                ) {
                    setWinner(squares[pattern[0]]);

                    if (squares[pattern[0]] === Players.Human.symbol) {
                        // axios to add currency
                        alert("Congrats, you have earned 100 Stardust!")

                        // to give currency and move on to next floor when user wins the game
                        axios.get(CURRENCY_URL + userid, {})
                            .then((response) => {

                                let updatedCurrency = response.data[0].quantity + 100;

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

                        axios.put(USER_URL + `/floor/${userid}`, { floorid: Number(getFloorId) + 1 })

                            .then(() => {
                                localStorage.setItem('floorid', Number(getFloorId) + 1)
                            })

                            .catch((err) => {
                                console.log(err)
                            })

                        const gameId = 4;

                        console.log(startTime)
                        axios.get(GAMEDURATION_URL + `/${gameId}/${userid}`, {})
                            .then((response) => {
                                const getAttempt = response.data[0].attempt;
                                console.log("Current Attempt Count: " + getAttempt)
                                console.log((Math.ceil((Date.now() - startTime)/60000)))

                                axios.post(GAMEDURATION_URL + `/addGameDuration`, {
                                    "gameId": gameId,
                                    "timestart": startTime,
                                    "timeend": Date.now(),
                                    "duration": (Math.ceil((Date.now() - startTime)/60000)),
                                    "userid": userid,
                                    "attempt": (getAttempt + 1)
                                })
                                    .catch((error) => {
                                        console.log(error)
                                        alert(error)
                                    })

                            })
                            .catch((error) => {
                                if (error.message == "Request failed with status code 404") {

                                    axios.post(GAMEDURATION_URL + `/addGameDuration`, {
                                        "gameId": gameId,
                                        "timestart": startTime,
                                        "timeend": Date.now(),
                                        "duration": (Math.ceil((Date.now() - startTime)/60000)),
                                        "userid": userid,
                                        "attempt": 1
                                    })
                                        .catch((error) => {
                                            console.log(error)
                                            alert(error)
                                        })
                                }
                                else {

                                    console.log(error)
                                    alert(error)
                                }
                            })

                        window.location.assign(`/user/react_floor.html`)
                    }

                    return true;

                }

            });
        }
    };

    // Handle the user clicking on a square
    const humanTurn = (num) => {
        // A guard clause to prevent the user from clicking on a square when it is the computer's turn
        if (turn === Players.Computer.symbol) {
            return;
        }

        // A guard clause to prevent the user from clicking on a square that has already been clicked
        if (cells[num] !== "") {
            return;
        }

        // A guard clause to prevent the user from clicking on a square when there is a winner
        if (winner) {
            return;
        }

        let cloneCells = [...cells];

        // Set the square to be the player's symbol
        cloneCells[num] = Players.Human.symbol;

        // Set the turn to be the computer's symbol
        setTurn(Players.Computer.symbol);

        setCells(cloneCells);
    };

    // Every time the cells array changes, check for a winner, otherwise, check for a draw
    // Every time the turn changes, check if the turn is the computer's turn, and select a random square for the computer
    React.useEffect(() => {

        axios.get(USER_URL + 'join/' + userid, {})

            .then((user) => {

                axios.get(FLOOR_URL + user.data.floorid, {})

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
        const isThereAWinner = checkWin(cells);

        // If there is no winner, check for a draw
        if (!isThereAWinner) {
            checkDraw(cells);
        }

        // If it is the computer's turn, select a random square
        if (turn === Players.Computer.symbol) {
            // Make the computer select a random square
            compTurn();

            // After selecting the square, set the turn to be the player's symbol
            // setTurn(Players.Human.symbol);
        }
    }, [cells, turn]);

    // This function checks for a draw
    const checkDraw = (squares) => {
        let isDraw = true;

        squares.forEach((square) => {
            if (square === "") {
                isDraw = false;
            }
        });

        if (isDraw) {
            setWinner("draw");

        }
    };

    // This function handles the restart of the game
    const handleRestart = () => {
        setWinner(null);
        setCells(Array(9).fill(""));

    };

    // // This is a component that renders a single square
    const TicTacToeBoardCell = ({ num }) => {
        return (

            <td

                style={{

                    cursor:

                        cells[num] === "" &&
                            turn === Players.Human.symbol &&
                            !winner
                            ? "crosshair"
                            : "not-allowed",

                }}

                onClick={() => humanTurn(num)}

            >
                {cells[num]}

            </td>
        );

    };

    // This functions selects a random square for the computer
    const compTurn = () => {
        setTimeout(() => {
            let cloneCells = [...cells];

            // Guard clause for a draw

            // The every function makes sure that every element in the array meets the condition
            if (cloneCells.every((cell) => cell !== "")) {
                console.log("It is a draw");
                return;
            }

            // Select a random number from 0 to cells length
            let randomNum = Math.floor(Math.random() * cells.length);

            // If the random number is already taken, select a new random number (recursive function - meaning it's calling the same function that was being called)
            if (cloneCells[randomNum] !== "") {
                compTurn();
            }
            else {
                // if (winner === "draw" || winner === Players.Human.symbol || winner === Players.Computer.symbol) {
                //     return;
                // }

                // If the random number is not taken, set the square to be the computer's symbol
                cloneCells[randomNum] = Players.Computer.symbol;

                console.log("Setting cells to: ", cloneCells);
                setCells(cloneCells,
                    setTurn(Players.Human.symbol));
            }

        }, 500)
    };

    return (

        < div >

            <TicTacToePlayerTurn symbol={Players.Human.symbol} turn={turn} winner={winner} />

            {winner && (
                <>

                    {/* The p tag below shows "It's a draw" if the winner is 'draw' otherwise show that "The winner is {}" followed by the player's name */}
                    <p id="winText">
                        {winner === "draw" &&
                            <button onClick={() => handleRestart()}>
                                Try Again
                            </button>
                        }

                        {winner === Players.Human.symbol && "You have earned 100 Stardust!"}

                        {winner === Players.Computer.symbol &&
                            <button onClick={() => handleRestart()}>
                                Try Again
                            </button>
                        }
                    </p>

                </>
            )}

            <div id="content">

                <TicTacToePlayerPic userid={userid} symbol={Players.Human.symbol} turn={turn} winner={winner} />

                <div id="board">
                    <table>

                        <tbody>

                            <tr className="top">
                                <TicTacToeBoardCell num={0} cells={cells} />
                                <TicTacToeBoardCell num={1} cells={cells} />
                                <TicTacToeBoardCell num={2} cells={cells} />
                            </tr>

                            <tr className="mid">
                                <TicTacToeBoardCell num={3} cells={cells} />
                                <TicTacToeBoardCell num={4} cells={cells} />
                                <TicTacToeBoardCell num={5} cells={cells} />
                            </tr>

                            <tr className="bot">
                                <TicTacToeBoardCell num={6} cells={cells} />
                                <TicTacToeBoardCell num={7} cells={cells} />
                                <TicTacToeBoardCell num={8} cells={cells} />
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div >
    );
}
