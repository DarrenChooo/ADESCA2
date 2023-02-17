// Linking to users
USER_URL = `${API_URL  }/users/`;

// Linking to floors
FLOOR_URL = `${API_URL  }/floors/`;

// Linking to NPC
NPC_URL = `${API_URL  }/npcs/`;

// Linking to GAME
GAME_URL = `${API_URL  }/games/`;

// Assign elements to a constant
const userid = window.localStorage.getItem('userid')
const image = document.getElementById('game')
const player = document.getElementById('player')
const profile = document.getElementById('profile')
const invIcon = document.getElementById('invIcon')
const invProfile = document.getElementById('invProfile')
let floorid 

window.onload = () => {
    invIcon.innerHTML = ` 
    <a href="/user/inventory.html">
    <i class="fa-solid fa-suitcase"></i>
    </a>`

    invProfile.innerHTML = `
    <a href="/user/user_profile.html">
    <i class="fa-solid fa-gear"></i>
    </a>`

    // Get User Details
    axios({
        method: 'get',
        url: `${USER_URL  }join/${userid}`
    })
    .then((response) => {
        floorid = response.data.floorid

        // const newFloorId = window.localStorage.getItem('newFloorId')

        // if (floorid != newFloorId) {
        //     floorid = newFloorId
        // }   

        // Get Floor Details
        axios({
            method: 'get',
            url: FLOOR_URL + floorid
        })
        .then((response) => {
            document.body.style.backgroundImage = `url('../images/${response.data.imageurl}')`
            // Get NPC Details  
            axios({
                method: 'get',
                url: NPC_URL + floorid
            })
            .then((response) => {
                const oldNpcImageUrl = window.localStorage.getItem('npcImageURL')

                localStorage.setItem('npcImageURL', response.data[0].imageurl)
                localStorage.setItem('npcId', response.data[0].npcid)

                const newNpcImageUrl = window.localStorage.getItem('npcImageURL')

                if (oldNpcImageUrl != newNpcImageUrl) {
                    location.reload()
                }

                // Get npcId from localStorage
                const npcId = localStorage.getItem('npcId') 
                // Get Game Details  
                axios({
                    method: 'get',
                    url: GAME_URL + npcId
                })
                .then((response) => {
                    localStorage.setItem('gameURL', response.data.gamename)
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

        // PixiJS Canvas Size
        const app = new PIXI.Application({
            width: 1540,
            height: 620,
            transparent: true
        })

        document.body.appendChild(app.view);

        // PixiJS Container
        const container = new PIXI.Container();
        app.stage.addChild(container);

        // Player Object
        const texture = PIXI.Texture.from(`../images/${response.data.userimageurl}`);
        const player = new PIXI.Sprite(texture);
        container.addChild(player);

        // Player Size
        player.scale.x = 0.30
        player.scale.y = 0.30

        // Player Position
        player.position.y = 390

        const npcImageURL = localStorage.getItem('npcImageURL')

        // NPC Object
        const texture2 = PIXI.Texture.from(`../images/${npcImageURL}`);
        const npc = new PIXI.Sprite(texture2);
        container.addChild(npc);

        // NPC Size
        npc.scale.x = 0.35
        npc.scale.y = 0.35
        npc.position.y = 400
        npc.position.x = 1200

        // Border Object
        const rect = new PIXI.Graphics()
        rect.beginFill(0xFFFF00);

        // Draw a rectangle
        rect.drawRect(0, 0, 10, 300);
        container.addChild(rect);

        // Border Position
        rect.position.y = 300
        rect.position.x = -10

        // Keyboard Event Listener
        window.addEventListener("keydown", keyDown)
        window.addEventListener("keyup", keyUp)

        app.ticker.add(gameLoop)

        const keys = {}

        function keyDown(event) {
            keys[event.keyCode] = true
        }

        function keyUp(event) {
            keys[event.keyCode] = false
        }

        function gameLoop () {
            // Keyboard Input 'D'
            if (keys["68"]) {
                player.x += 5;
            }

            // Keyboard Input 'S'
            if (keys["65"]) {
                player.x -= 5;
            }

            // If Player and NPC intersect
            if (intersect(player, npc)){
                player.x = 0

                // Get npcId from localStorage
                const gameURL = localStorage.getItem('gameURL') 
                const npcId = localStorage.getItem('npcId') 

                // Redirect users to respective game with npc details
                // window.location.href = `/user/${gameURL}.html`
                window.location.href = `/user/dialogue_interaction.html?npcid=${npcId}`
            }

            // If Player and NPC intersect
            if (intersect(player, rect)){
                player.x = 5

            }
        }

        function intersect (a, b) {
            const aBox = a.getBounds()
            const bBox = b.getBounds()

            return  aBox.x + aBox.width > bBox.x &&
                    aBox.x < bBox.x + bBox.width &&
                    aBox.y < aBox.height + bBox.y &&
                    aBox.y < bBox.y  + bBox.height 
        }

        profile.innerHTML += `
        <div class="profileImage">
            <img src="../images/${response.data.userimageurl}">
        </div>
        <div class="profileDetails">
            <h3>Profile: ${response.data.username}</h3>
            <h3>StarDust: ${response.data.quantity}</h3>
            
        </div>
        `
    })
    .catch((error) => {
        console.log(error)
    })
}


