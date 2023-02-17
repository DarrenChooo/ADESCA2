//Linking to NPC
const NPC_URL = API_URL + '/npcs/';

//Linking to User
const USER_URL = API_URL + '/users/';

//Linking to Currency
const CURRENCY_URL = API_URL + '/currency/';

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactDOM from "react-dom/client";

/////////////////////////////////////////////////////////////////////
//Importing web components from other jsx files
/////////////////////////////////////////////////////////////////////
import GameTitle from "./components/GameTitle.js";
import HangmanAnswer from "./components/HangmanAnswer.js";
import HangmanKeyboard from "./components/HangmanKeyboard.js";
import HangmanTries from "./components/HangmanTries.js";
import LoadingSpinner from "./components/LoadingSpinner.js";
import ErrorPage from "./components/ErrorPage.js";
import useDidMountEffect from "./components/useDidMountEffect.js";
const Hangman = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [gameState, setGameState] = React.useState(true);
  const [gameTitle, setGameTitle] = React.useState("");
  const [loadingWords, setLoadingWords] = React.useState("");
  const [gameResult, setGameResult] = React.useState("");
  React.useEffect(() => {
    setLoadingWords("Generating Random Words...");
    setTimeout(() => {
      setGameTitle("Hangman");
    }, 2000);
  }, [gameTitle]);

  // Create an array of words
  const words = ["WONDERFUL", "EXCITING", "DISCOVERY", "EXCEPTIONAL", "MAGNIFICENT", "SPARKLING", "MYSTERIOUS", "EXUBERANT", "SPLENDID", "DAZZLING", "OPULENT", "ENCHANTING", "GLORIOUS", "ADMIRABLE", "BRILLIANT", "GRANDIOSE", "SPECTACULAR", "IMPRESSIVE"];

  // Create States to store values
  const [word, setAnswerWord] = React.useState("");
  const [answerArray, setAnswerArray] = React.useState([]);
  const [position, setPosition] = React.useState(0);

  // For PixiJS
  const [penguin1] = React.useState(new PIXI.Sprite(PIXI.Texture.from(`../images/Zera.png`)));
  const [penguin2] = React.useState(new PIXI.Sprite(PIXI.Texture.from(`../images/Clyde.png`)));

  // For error handling
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  // Pick a random word
  useDidMountEffect(() => {
    // PixiJS Canvas Size
    const app = new PIXI.Application({
      width: 1520,
      height: 720,
      transparent: true
    });
    document.body.appendChild(app.view);

    // PixiJS Container
    const container = new PIXI.Container();
    app.stage.addChild(container);

    // Hole Object
    const hole1 = new PIXI.Sprite(PIXI.Texture.from(`../images/hole.png`));
    const hole2 = new PIXI.Sprite(PIXI.Texture.from(`../images/hole.png`));

    // Adding Objects into Container
    container.addChild(penguin1, penguin2, hole1, hole2);

    // Penguins Size
    penguin1.scale.x = 0.30;
    penguin1.scale.y = 0.30;
    penguin2.scale.x = 0.25;
    penguin2.scale.y = 0.25;

    // Hole size
    hole1.scale.x = 0.16;
    hole1.scale.y = 0.16;
    hole2.scale.x = 0.16;
    hole2.scale.y = 0.16;

    // Penguins Position
    penguin1.position.x = 100;
    penguin2.position.x = 1250;

    // Hole Position
    hole1.position.x = 20;
    hole1.position.y = 600;
    hole2.position.x = 1150;
    hole2.position.y = 600;
    setAnswerWord(words[Math.floor(Math.random() * words.length)]);
  }, [gameTitle]);

  // Split the word into Array of letters
  useDidMountEffect(() => {
    for (let i = 0; i < word.length; i++) {
      setAnswerArray(word.split(''));
    }
  }, [word]);

  // Create Letters
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [lettersArray, setLettersArray] = React.useState([]);

  // Split the letters into Array for keyboard display
  useDidMountEffect(() => {
    setLettersArray(letters.split(''));
  }, [answerArray]);

  // Create States to store values for amount of tries left
  const [tries, setTries] = React.useState("");
  const [userInput, setUserInput] = React.useState("");
  const [correctGuesses, setCorrectGuesses] = React.useState([]);
  const [found, setFound] = React.useState(false);

  // Set amount of tries 
  useDidMountEffect(() => {
    setTries("10");
    setIsLoading(false);
  }, [lettersArray]);
  const handleClick = event => {
    // Get letter input from player
    const letter = event.target.getAttribute("data-value");
    setUserInput(event.target.getAttribute("data-value"));

    // Check if letter is found in answerArray
    for (let i = 0; i < word.length; i++) {
      if (letter == answerArray[i]) {
        setFound(true);
        setCorrectGuesses([...correctGuesses, letter]);
      }
    }

    // Set keyboard letter disabled when pressed 
    document.getElementById(event.target.id).setAttribute('disabled', '');
  };

  // If tries = 0, reset game
  useDidMountEffect(() => {
    if (tries == 0) {
      setGameResult("lose");
    }
  }, [tries]);

  // Check whether letter is found
  useDidMountEffect(() => {
    // If letter is not found - 1 try
    if (!found && word.length != 0) {
      setTries(tries - 1);
      setPosition(position + 50);
    }

    // If letter is found
    if (found) {
      setFound(false);
    }
  }, [userInput]);

  // Renders PixiJS
  useEffect(() => {
    penguin1.position.y = position;
    penguin2.position.y = position + 24;
  }, [position]);

  // Check if every Answer's letter is in User's Input
  useDidMountEffect(() => {
    if (answerArray.every(letter => correctGuesses.includes(letter)) && answerArray.length != 0) {
      setGameResult("win");
    }
  }, [userInput]);

  // Function to set user is ready
  function changeGameState() {
    setGameState(false);
  }

  // Set Ref
  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState("");
  const getTimeRemaining = e => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor(total / 1000 % 60);
    const minutes = Math.floor(total / 1000 / 60 % 60);
    return {
      total,
      minutes,
      seconds
    };
  };
  const startTimer = e => {
    let {
      total,
      minutes,
      seconds
    } = getTimeRemaining(e);
    if (total >= 0) {
      // Update the timer, to check if less than 10 then we need to  add '0' at the beginning of the variable
      setTimer((minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds));
    }
  };
  const clearTimer = e => {
    // Set timer state to 5 minutes
    setTimer('05:00');

    // Countdown after every 1000ms 
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };
  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 300);
    return deadline;
  };
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  // Reset game if time hits 0
  useEffect(() => {
    if (timer == "00:00") {
      setGameResult("lose");
    }
  }, [timer]);
  const [earnedCoins, setEarnedCoins] = React.useState(100);
  const [userCoins, setUserCoins] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [floorId, setFloorId] = React.useState("");

  // When player wins
  useDidMountEffect(() => {
    gameResult == "win" ? (setUserId(localStorage.getItem('userid')), setLoadingWords("Redirecting back to floors...")) : null;
  }, [gameResult]);

  // Get user coin quantity
  useDidMountEffect(() => {
    axios({
      method: 'get',
      url: CURRENCY_URL + userId
    }).then(response => {
      setUserCoins(response.data[0].quantity);
    }).catch(error => {
      setError(true);
      setErrorMessage(error.response.status);
    });
  }, [userId]);

  // Update user coin quantity
  useDidMountEffect(() => {
    axios({
      method: 'put',
      url: CURRENCY_URL + userId,
      data: {
        quantity: userCoins + earnedCoins
      }
    }).then(response => {
      axios({
        method: 'get',
        url: USER_URL + userId
      }).then(response => {
        setFloorId(response.data.floorid);
      }).catch(error => {
        setError(true);
        setErrorMessage(error.response.status);
      });
    }).catch(error => {
      setError(true);
      setErrorMessage(error.response.status);
    });
  }, [userCoins]);

  // Updates user Floor ID
  useDidMountEffect(() => {
    axios({
      method: 'put',
      url: USER_URL + "floor/" + userId,
      data: {
        floorid: Number(floorId) + 1
      }
    }).then(response => {
      localStorage.setItem('floorid', Number(floorId) + 1);
      window.location.assign(`/user/react_floor.html`);
    }).catch(error => {
      setError(true);
      setErrorMessage(error.response.status);
    });
  }, [floorId]);

  // Restarts Game
  function restartGame() {
    window.location.reload();
  }
  return /*#__PURE__*/React.createElement("div", {
    key: "game",
    className: "game"
  }, error ? /*#__PURE__*/React.createElement(ErrorPage, {
    setErrorMessage: errorMessage
  }) : isLoading ? /*#__PURE__*/React.createElement(LoadingSpinner, {
    setLoadingWords: loadingWords
  }) : gameState ? /*#__PURE__*/React.createElement("div", {
    key: "gameCtn",
    className: "gameCtn"
  }, /*#__PURE__*/React.createElement(GameTitle, {
    setGameTitle: gameTitle
  }), /*#__PURE__*/React.createElement("h2", null, "This is a hangman game based from a random word generator"), /*#__PURE__*/React.createElement("h2", null, "You get ten tries before its game over"), /*#__PURE__*/React.createElement("h2", null, "There will be a timer of 5 minutes"), /*#__PURE__*/React.createElement("div", {
    className: "buttonCtn"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: changeGameState,
    className: "startButton",
    type: "button"
  }, "Start Game"))) : gameResult == "win" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    key: "winStatus"
  }, "Congratulations you earned 100 coins"), /*#__PURE__*/React.createElement(LoadingSpinner, {
    setLoadingWords: loadingWords
  })) : gameResult == "lose" ? /*#__PURE__*/React.createElement("div", {
    key: "loseCtn",
    className: "loseCtn"
  }, /*#__PURE__*/React.createElement("h1", null, "Game over you lost!"), /*#__PURE__*/React.createElement("div", {
    className: "loseBtnCtn"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: restartGame,
    className: "loseButton",
    type: "button"
  }, "Restart")), /*#__PURE__*/React.createElement("h2", null, "Restart : Try again with 10 more tries and a new random generated word")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    key: "timerCtn",
    className: "timerCtn"
  }, /*#__PURE__*/React.createElement("h1", null, timer)), /*#__PURE__*/React.createElement(HangmanAnswer, {
    setAnswerArray: answerArray,
    setCorrectGuesses: correctGuesses
  }), /*#__PURE__*/React.createElement(HangmanKeyboard, {
    handleClick: handleClick,
    setLettersArray: lettersArray
  }), /*#__PURE__*/React.createElement(HangmanTries, {
    setTries: tries
  })));
};

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(Hangman, null));