

class Circle { // make circle
    constructor(color, radius, v) {
        this.radius = radius;
        this.v = v;

        const circle = new PIXI.Graphics();
        circle.beginFill(color);
        circle.drawCircle(0, 0, radius);
        circle.endFill();
        circle.x = radius;
        circle.y = radius;
        app.stage.addChild(circle);

        this.circle = circle;
    }

    remove() {
        app.stage.removeChild(this.circle);
    }

    collide(other) {
        const dx = other.circle.x - this.circle.x;
        const dy = other.circle.y - this.circle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        return dist < (this.radius + other.radius);
    }
}

class Monster extends Circle {  // spawn monster class (blueball)
    update() {
        this.circle.x += this.v.x;
        this.circle.y += this.v.y;

        if (this.circle.x >= w - this.radius) {
            shake("right");
            this.v.x *= -1;
        }

        else if (this.circle.x <= this.radius) {
            shake("left");
            this.v.x *= -1;
        }

        if (this.circle.y >= h - this.radius) {
            shake("down");
            this.v.y *= -1;
        }
        else if (this.circle.y <= this.radius) {
            shake("up");
            this.v.y *= -1;
        }
    }
}

class Player extends Circle { // player class
    constructor(color, radius, v) {
        super(color, radius, v);
        this.reset();
    }

    reset() { // reset and respawn the player into the middle
        this.circle.x = w / 2;
        this.circle.y = h / 2;
        this.speed = 2;
    }

    update() {
        const x = this.circle.x + this.v.x;
        const y = this.circle.y + this.v.y;

        this.circle.x = Math.min(Math.max(x, this.radius), w - this.radius);
        this.circle.y = Math.min(Math.max(y, this.radius), w - this.radius);


        monsters.forEach(m => {
            if (this.collide(m)) { // if player collide, restart the game
                reset();
                
            }
        });

        // coin
        if (this.collide(coin)) {  // if player collide, +1 coin
            updateCoins(coins + 1);
            coin.random(); // randomize spawn location
            addMonster();  // spawns newMonster after user collide with a coin
            this.speed = Math.min(4, this.speed + 0.2);
            ClickEvent("coins");

            
        }
    }
}

class Coin extends Circle {
    random() {
        this.circle.x = this.radius + Math.random() * (w - 2 * this.radius);
        this.circle.y = this.radius + Math.random() * (h - 2 * this.radius);
    }

    update() {
        const s = 1 + Math.sin(new Date() * 0.01) * 0.2;
        this.circle.scale.set(s, s);
    }
}


function shake(className) { // allow the monsters to keep moving after player gets 1 coin
    return;

    app.view.className = className;
    setTimeout(() => { app.view.className = "" }, 50);
}

function addMonster() {  // function that spawns a newMonster
    monsters.push(new Monster(0x79a3b1, Math.random() * 10 + 10 + 5, { x: 2 + Math.random(), y: 2 + Math.random() }));
}

function onkeydown(ev) {
    switch (ev.key) {
        case "ArrowLeft":
        case "a":
            player.v.x = -player.speed;
            pressed.left = true;
            break;

        case "ArrowRight":
        case "d":
            player.v.x = player.speed;
            pressed.right = true;
            break;

        case "ArrowUp":
        case "w":
            player.v.y = -player.speed;
            pressed.up = true;
            break;

        case "ArrowDown":
        case "s":
            player.v.y = player.speed;
            pressed.down = true;
            break;
    }
}
function onkeyup(ev) {
    switch (ev.key) {
        case "ArrowLeft":
        case "a":
            player.v.x = pressed.right ? player.speed : 0;
            pressed.left = false;
            break;

        case "ArrowRight":
        case "d":
            player.v.x = pressed.left ? -player.speed : 0;
            pressed.right = false;
            break;

        case "ArrowUp":
        case "w":
            player.v.y = pressed.down ? player.speed : 0;
            pressed.up = false;
            break;

        case "ArrowDown":
        case "s":
            player.v.y = pressed.up ? -player.speed : 0;
            pressed.down = false;
            break;
    }
}

function setupControls() {  // setting up controls
    window.addEventListener("keydown", onkeydown);
    window.addEventListener("keyup", onkeyup);
}

function reset() {  // reset the game
    monsters.forEach(m => {
        m.remove();
    });

    monsters = [];
    addMonster();
    player.reset();
    coin.random();
    updateCoins(0);
}

function updateCoins(num) {
    coins = num;
    document.querySelector('#score span').innerHTML = coins;
    // user gets score of 5, returns to url below
    if (coins >= 1) {
        const userid = localStorage.getItem('userid');
        const gameprogress = Math.floor(Math.random() * 11)
        const defaultURL = API_URL
        API_URL += '/currency';

        axios.get(`${API_URL  }/${userid}`, {})
            .then(function (body) {
                const currency = body.data[0]
                axios.put(`${API_URL  }/${userid}`, {
                    quantity: (currency.quantity + 10) * gameprogress
                }).then(function(body){
                    // due to time constraint, cannot finish
                    const gameprogress = 0
                //     axios.post(defaultURL + `/users/addprogress/${userid}`),{
                //         userid: userid,
                //         gameprogress : gameprogress
                //     }.then(function(body){
                //         axios.put(defaultURL + `/users/updategameprogress/${userid}`),{
                //             gameprogress: gameprogress
                //     }              
                //    })
            })
            .then((body) => {
                let updatedCurrencyHTML = ''
                updatedCurrencyHTML = `
                        <div class="displayDiv1">Results: </div>
                        <div class="displayDiv2">User ID: </div>
                        <div class="displayDiv4">Quantity: </div>              
                `
                about.innerHTML = updatedCurrencyHTML;
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            });
        alert(`U WON`)
        window.location.assign('../user/react_floor.html');
        
    })
}
}
function gameLoop() {
    player.update();
    coin.update();
    monsters.forEach(c => {
        c.update();
    });
}

// resize
window.onresize = () => {
    const d = document.querySelector("div#canvas");
    w = d.clientWidth;
    h = w;
    app.renderer.resize(w, h);
    reset();
}

// setting canvas

let w = 512; let h = 512;
let app = new PIXI.Application({ width: w, height: h, antialias: true });
let monsters = [];
let pressed = {};
let player = new Player(0xfcf8ec, 10, { x: 0, y: 0 });
let coin = new Coin(0xFFD700, 10, { x: 0, y: 0 });
let coins;

app.renderer.backgroundColor = 0x456268; // background colour
document.querySelector("div#canvas").appendChild(app.view);
setInterval(gameLoop, 1000 / 60); // this makes the game feels like 60 fps by refreshing 60 times/sec
setupControls();
window.onresize();

const about = document.getElementById('about')