BOSS_API_URL = `${API_URL  }/boss/`;
USER_API_URL = `${API_URL  }/users/`;
ITEM_API_URL = `${API_URL  }/items/`;
FLOOR_API_URL = `${API_URL  }/floors/`;
CURRENCY_API_URL = `${API_URL  }/currency/`;
IMAGE_URL += '/images/';

const userid = localStorage.getItem('userid')

const {Application} = PIXI;
const {Graphics} = PIXI;
const {Container} = PIXI;
const {TextStyle} = PIXI;
const {Text} = PIXI;
const Filter = new PIXI.filters.ColorMatrixFilter();
const loader = PIXI.Loader.shared;
let drag
let item
let critRate = 0
let damage = 0
let click = 0
let count = 0
let attackSpeedLimit = true

// Implementing PixiJS Application
const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true,
    antialias: true,
})

// Appending the PixiJS Application to the HTML Body
document.body.appendChild(app.view);
app.renderer.view.style.position = 'absolute';
app.stage.interactive = true;

// Declaring containers where player and boss sprites and assets will be displayed
const playerContainer = new Container();
const bossContainer = new Container();

window.onload = () => {
    axios.get(BOSS_API_URL + 1, {})
        .then((response) => {
            const BOSS_HEALTH = response.data.bosshealth
            app.stage.addChild(bossContainer);
            // Initializing boss's sprite
            const boss = PIXI.Sprite.from(`${IMAGE_URL + response.data.imageurl}`);
            bossContainer.addChild(boss)
            // Boss sprite dimensions
            boss.scale.x = 0.7;
            boss.scale.y = 0.7;

            // Boss sprite inital position
            bossContainer.position.set(1100, 400)

            // Making the boss sprite DisplayObject interactive
            boss.interactive = true;
            boss.buttonMode = true;
            console.log(boss)

            axios.get(`${USER_API_URL  }join/${  userid}`, {})
                .then((user) => {
                    app.stage.addChild(playerContainer);
                    // Initializing player's sprite
                    const player = PIXI.Sprite.from(`${IMAGE_URL + user.data.userimageurl}`);
                    playerContainer.addChild(player);

                    // Setting player sprite anchor
                    player.anchor.y = 1

                    // Setting player sprite inital position
                    playerContainer.position.set(5, 720)

                    // Making the player sprite DisplayObject interactive
                    player.interactive = true;

                    const style = new TextStyle({
                        fontFamily: 'Montserrat',
                        fontSize: 20,
                        fill: 'white',
                        wordWrap: true,
                        wordWrapWidth: 100,
                        align: "center"
                    });

                    const instructions = new Text('Move towards the enemy!', style)
                    instructions.anchor.y = 1
                    instructions.y -= 150
                    console.log(instructions.y)
                    playerContainer.addChild(instructions)

                    item = PIXI.Sprite.from(`${IMAGE_URL + user.data.imageurl}`);
                    item.anchor.y = 1
                    item.position.set(61, -12)
                    item.scale.set(0.07, 0.07)
                    item.rotation = -0.25
                    playerContainer.addChild(item)

                    // Implement weapon damage based on equipped item Damage stats
                    damage = user.data.damage

                    // Implement critical hit rate based on equipped item Crit Rate stats
                    critRate = user.data.critrate
                    criticalEffect = PIXI.Sprite.from(`../images/criticalEffect.png`);
                    criticalEffect.anchor.y = 1
                    criticalEffect.scale.set(0.03, 0.03)
                    criticalEffect.position.set(0, 200)

                    // Implement attack speed limiter based on equipped item Attack Speed stats
                    setInterval(() => {
                        attackSpeedLimit = false
                    }, (100 - user.data.speed) * 5)

                    window.addEventListener("keydown", keyDown)
                    window.addEventListener("keyup", keyUp)

                    const keyPressed = {}

                    function keyDown(e) {
                        keyPressed[e.key] = true
                    }

                    function keyUp(e) {
                        keyPressed[e.key] = false
                    }
                    function movement() {
                        // Forward movement
                        if (keyPressed.d) {
                            playerContainer.x += 6;
                            player.scale.x = 1
                            instructions.anchor.y = 1
                            drag.scale.x = 0.1
                            drag.position.set(70, -25);
                            item.scale.set(0.07, 0.07)
                            item.position.set(61, -12)
                            item.rotation = -0.25
                        }
                        // Backward movement
                        if (keyPressed.a) {
                            playerContainer.x -= 6;
                            player.scale.x = -1
                            instructions.anchor.y = -1
                            drag.scale.x = -0.1
                            drag.position.set(-70, -25)
                            item.scale.x = -0.07
                            item.position.set(-61, -12)
                            item.rotation = 0.25
                        }
                    }

                    // Implementing sprite animations using PixiJS Filters
                    requestAnimationFrame(animate);

                    function animate() {

                        boss.scale.x += Math.sin(count) * 0.0005;
                        boss.scale.y += Math.cos(count) * 0.0006;

                        playerContainer.scale.x += + Math.sin(count) * 0.0007;
                        playerContainer.scale.y = 1 + Math.cos(count) * 0.016;

                        count += 0.1;

                        const {matrix} = Filter;

                        matrix[1] = Math.sin(count) * 3;
                        matrix[2] = Math.cos(count);
                        matrix[3] = Math.cos(count) * 1.5;
                        matrix[4] = Math.sin(count / 3) * 2;
                        matrix[5] = Math.sin(count / 2);
                        matrix[6] = Math.sin(count / 4);

                        requestAnimationFrame(animate);
                    }
                    document.body.style.backgroundImage = `url('${`${IMAGE_URL  }floor1.jpg`}')`;

                    // Rendering ground for player sprite to walk on
                    const rectangle = new Graphics();
                    rectangle.beginFill(0x433640)
                        .lineStyle(4, 0x51444b, 1)
                        .drawRect(0, 720, window.innerWidth, 120)
                        .endFill();
                    app.stage.addChild(rectangle);
                    const totalHealthBar = new Graphics();
                    const healthBar = new Graphics();

                    totalHealthBar.beginFill(0)
                        .lineStyle(6, 0x000000, 1)
                        .drawRect((window.innerWidth / 2) - 350, 30, 700, 48)
                        .endFill();

                    healthBar.beginFill(0x597258)
                        .drawRect(0, 30, 700, 48)
                        .endFill();
                    healthBar.x = (window.innerWidth / 2) - 350
                    app.stage.addChild(totalHealthBar);
                    app.stage.addChild(healthBar);

                    health = () => {
                        const remainingHealth = Math.floor(100 - (click / BOSS_HEALTH * 100))
                        console.log(`${remainingHealth  }%`)
                        return remainingHealth
                    }

                    const floorid = localStorage.getItem('floorid')

                    // Check for collision of sprites (if player is in range to attack boss)
                    function collision(player, boss) {
                        const playerBox = player.getBounds()
                        const bossBox = boss.getBounds()

                        return playerBox.x + playerBox.width > bossBox.x &&
                            playerBox.x < bossBox.x + bossBox.width
                    }

                    loader.add('tileset', '../images/spritesheet.json')
                        .load(setup);

                    function setup(loader, resources) {
                        const textures = [];
                        for (let i = 1; i < 4; i++) {
                            const texture = PIXI.Texture.from(`../images/attackEffect-${i}.png`);
                            textures.push(texture);
                        }
                        drag = new PIXI.AnimatedSprite(textures);
                        drag.anchor.y = 1
                        drag.scale.set(0.1, 0.1);
                        drag.play();

                        drag.animationSpeed = 0.2;
                    }

                    function animateCriticalEffect() {
                        criticalEffect.position.y -= 1
                    }

                    boss.on('click', () => {
                        // If player is in range to attack boss
                        if (collision(player, boss) && !attackSpeedLimit) {
                            // Implementing Critical Hit odds based on user's equipped item critical rate
                            const critRoll = Math.floor(Math.random() * 101)
                            if (critRoll <= critRate) {
                                criticalEffect.position.set(Math.floor(Math.random() * 300), 200)
                                bossContainer.addChild(criticalEffect)
                                click += damage / 7
                                app.ticker.add(animateCriticalEffect)
                            } else {
                                click += damage / 10
                            }
                            healthBar.width = 700 * (health(click) / 100)
                            playerContainer.addChild(drag);
                            setTimeout(() => playerContainer.removeChild(drag), 250)
                            attackSpeedLimit = true
                        }

                        // WIN CONDITION ACHIEVED
                        if (click >= BOSS_HEALTH) {

                            axios.get(CURRENCY_API_URL + userid, {})
                                .then((currency) => {

                                    const newCurrency = currency.data[0].quantity + response.data.bossreward

                                    axios.put(CURRENCY_API_URL + userid, {
                                        quantity: newCurrency
                                    })
                                        .then(() => {
                                            console.log('Currency updated');
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

                            axios({
                                method: 'put',
                                url: `${USER_API_URL  }floor/${  userid}`,
                                data: {
                                    floorid: Number(floorid) + 1
                                }
                            })
                                .then(() => {
                                    localStorage.setItem('floorid', Number(floorid) + 1)
                                })
                                .catch((err) => {
                                    console.log(err)
                                })

                            click = 0
                            alert(`You have defeated the boss of this floor! You have earned some coins`)
                            window.location.assign(`/user/react_floor.html`)
                        }
                    });

                    ifInRange = () => {
                        if (collision(player, boss)) {
                            boss.cursor = "crosshair"
                            instructions.text = "Attack the enemy! Now!"
                        }
                        else {
                            boss.cursor = "auto"
                            instructions.text = "Move towards the enemy!"
                        }
                    }
                    app.ticker.add(movement);
                    app.ticker.add(ifInRange);
                })
                .catch((err) => {
                    console.log(err);
                    alert(err);
                })
        })
}