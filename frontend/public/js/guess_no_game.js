// random number generator
let ranNo = 0;
function randomNum() {
  ranNo = Math.floor(Math.random() * 100) + 1;
  // console.log(ranNo)
}

// no of guesses
const noOfGuesses = document.getElementById("counter");

// counter start at 0
let counter = 0;

function guessNum() {
  counter++;
  // console.log(counter)

  // display counter
  let noOfGuessesHTML = ''
  noOfGuessesHTML = `
  <span>${counter}</span>
  `
  noOfGuesses.innerHTML = noOfGuessesHTML;

  if (counter > 10) {
    alert("You have exceeded the number of guesses. Please try again.")
    location.reload();
  }
  // console.log(noOfGuesses.innerHTML)

  // guess input
  const numInput = document.getElementById("numInput");

  // number guessed start at 0
  let noInput = 0;
  // get value of input
  noInput = numInput.value;
  // console.log(noInput)
  icon = document.getElementById("theIcon");
  // if number guessed is higher than random number generated
  if (noInput > ranNo) {
    icon.innerHTML = `<i class="fas fa-arrow-down"></i>`;
    document.body.style.backgroundColor = "red";

    // if number guessed is lower than random number generated
  } else if (noInput < ranNo) {
    icon.innerHTML = `<i class="fas fa-arrow-up"></i>`;
    document.body.style.backgroundColor = "red";


    // if number guessed is equal to random number generated
  } else if (noInput == ranNo) {
    // the make your guess div
    const theGuessingDiv = document.getElementById("theGuessingDiv");
    icon.innerHTML = `<i class="fas fa-check-circle"></i>`;
    // make div disappear
    theGuessingDiv.style.display = "none";

    // the correct number 
    const correctNum = document.getElementById("correctNum");
    correctNum.innerHTML = `<h3>${ranNo}</h3>`;

    // congrats div
    const congratsDiv = document.getElementById("congratsDiv");
    // make congrats div appear cause it was hidden by display none
    congratsDiv.style.display = "block";
    document.body.style.backgroundColor = "limegreen";
  }
  numInput.value = "";
}

// generate random number on page load
window.onload = function () {
  randomNum()
}


// guessbutton 
const guessBtn = document.getElementById("guessButton");
guessBtn.onclick = function () {
  guessNum();

}

// Linking to inventory
USER_API_URL = `${API_URL  }/users/`;
IMAGE_URL += '/images/';
CURRENCY_API_URL = `${API_URL  }/currency/`;
const userid = localStorage.getItem('userid')
const floorid = localStorage.getItem('floorid')
// congrats button 
const congratsBtn = document.getElementById("congratsButton");
congratsBtn.onclick = function () {
  // Get user currency by userid
  axios.get(CURRENCY_API_URL + userid, {})
    .then(function (body) {
      const currency = body.data[0]
      // console.log(currency)
      // coins awarded
      const awarded = 100
      // update currency after winning
      axios.put(CURRENCY_API_URL + userid, {
        quantity: currency.quantity + awarded
      })
      // axios.get(USER_API_URL + `join/${userid}`, {})
      //   .then(function (body) {
      //     let floorid = body.data.floorid
      //     // console.log(floorid)

      //   })
      // update floorid
      axios.put(`${USER_API_URL  }floor/${userid}`, {
        floorid: parseInt(floorid) + 1
      })
        .then(function (body) {
          // console.log(body.data)
          alert(`You have been awarded ${awarded} coins!`)
          window.location.assign("react_floor.html")
        })
        .catch((error) => {
          console.log(error)
        })
        .catch((error) => {
          console.log(error)
        })


    })
    .catch((error) => {
      console.log(error)
    });
}

/// /////////////////////////////////////////////////////////////
// BACKEND THINGS
/// /////////////////////////////////////////////////////////////
