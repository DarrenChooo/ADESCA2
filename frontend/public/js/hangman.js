/// //////////////////////////////////////////////////////////////////
// Linking to currency
/// //////////////////////////////////////////////////////////////////
CURRENCY_URL = `${API_URL  }/currency/`;

/// //////////////////////////////////////////////////////////////////
// Linking to update user floor route
/// //////////////////////////////////////////////////////////////////
USER_URL = `${API_URL  }/users/floor/`;

// Assign elements to a constant
const answerCtn = document.getElementById("answerCtn")
const keyboard = document.getElementById("keyboard")

// Create an array of words
const words = [
    "CULTIVATE",
    "CELLAR",
    "SLOGAN",
    "DOOR",
    "MOUSE",
    "ADMIT",
    "BEAUTIFUL",
    "UNITY",
    "ELATED",
    "ALLOW",
    "FAT"
]

// Create Letters
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// Pick a random word
const word = words[Math.floor(Math.random() * words.length)]

// Set up the answer answerArray 
let answerArray = []

// Get the amount of letters from Answer length
let remainingLetters = word.length;

// Set amount of coins when completing game 
const coins = 100

for (i = 0; i < word.length; i++) {
    answerArray = word.split('')
    answerCtn.innerHTML += `<div class="answerBox" id="answerIndex${i}" data-value="${answerArray[i]}">_</div>`
}

window.onload = () => {
    const lettersArr = letters.split('')
    // After every 9th letter, make a new row
    for(i=0; i < lettersArr.length; i++) {
        if (i % 9 == 0) {
            keyboard.innerHTML += `<div class="divider"></div>`
        }
        keyboard.innerHTML += `<button class="letters" id="${lettersArr[i]}" data-value="${lettersArr[i]}">${lettersArr[i]}</button>`
    }    
}

    // PixiJS Canvas Size
    const app = new PIXI.Application({
        width: 1520,
        height: 720,
        transparent: true
    })

    document.body.appendChild(app.view);

    // PixiJS Container
    const container = new PIXI.Container();
    app.stage.addChild(container);

    // Penguin1 Object
    const penguin1 = new PIXI.Sprite( PIXI.Texture.from(`../images/Zera.png`));

    // Penguin2 Object
    const penguin2 = new PIXI.Sprite( PIXI.Texture.from(`../images/Clyde.png`));

    // Hole Object
    const hole1 = new PIXI.Sprite(PIXI.Texture.from(`../images/hole.png`));
    const hole2 = new PIXI.Sprite(PIXI.Texture.from(`../images/hole.png`));

    // Adding Objects into Container
    container.addChild(penguin1, penguin2, hole1, hole2);

    // Penguins Size
    penguin1.scale.x = 0.30
    penguin1.scale.y = 0.30
    penguin2.scale.x = 0.25
    penguin2.scale.y = 0.25

    // Hole size
    hole1.scale.x = 0.16
    hole1.scale.y = 0.16
    hole2.scale.x = 0.16
    hole2.scale.y = 0.16

    // Penguins Position
    penguin1.position.x = 100
    penguin2.position.x = 1250
    penguin2.position.y = 24

    // Hole Position
    hole1.position.x = 20
    hole1.position.y = 600
    hole2.position.x = 1150
    hole2.position.y = 600

keyboard.addEventListener('click',  (e) => {
    // Get letter input from player
    const letter = document.getElementById(e.target.id).getAttribute('data-value')

    // Get number of tries
    const triesCount = document.getElementById("triesCount")
    let found = false
    const answerPosition = []

    // Check if letter is found in answerArray
    for (i = 0; i < word.length; i++) {
        if (letter == answerArray[i]) {
            found = true
            answerPosition.push(i)
        } 
    }   

    // Set keyboard letter disabled when pressed 
    document.getElementById(e.target.id).setAttribute('disabled', '')

    // If letter is not found - 1 try
    if (found == false) {
        triesCount.innerHTML-- 
        penguin1.y += 50
        penguin2.y += 50
    }

    // If letter is found
    if (found == true) {
        // Loops through answerPosition length to check for duplicate letters
        for (i=0; i<answerPosition.length; i++) {
            const guessLetter = document.getElementById(`answerIndex${answerPosition[i]}`)
            const guessLetterValue = guessLetter.getAttribute("data-value")
            
            // Changed underscore in html to letter value
            guessLetter.innerHTML = guessLetterValue
        }
        remainingLetters -= answerPosition.length
    }

    // If tries = 0, reset game
    if (triesCount.innerHTML == 0) {
        alert('Game Over')
        window.location.reload()
    }

    if (remainingLetters == 0) {
        let userCoins
        const userId = localStorage.getItem('userid');

        // Get user coin quantity
        axios({
            method: 'get',
            url: CURRENCY_URL + userId
        })
        .then((response) => {
            userCoins = response.data[0].quantity

            // Update user coin quantity
            axios({
                method: 'put',
                url: CURRENCY_URL + userId,
                data : {
                    quantity: userCoins + coins
                }
            })
            .then((response) => {
                // Get Floor ID through local storage
                const floorId = window.localStorage.getItem('floorid')

                // Updates user Floor ID
                axios({
                    method: 'put',
                    url: USER_URL + userId,
                    data : {
                        floorid: Number(floorId) + 1
                    }
                })
                .then((response) => {
                    localStorage.setItem('floorid', Number(floorId) + 1)
                    // Alert users that they won
                    alert(`Congrats, you have earned ${coins} coins!`)
                    window.location.assign(`/user/floor.html`)
                })
                .catch((error) => {
                    console.log(error)
                })
            })
            .catch((error) => {
                console.log(error)
            })
        })
        .catch((error) => {
                console.log(error)
        })
        
    }

})