// Linking to NPC
/// //////////////////////////////////////////////////////////////////
// Importing React libraries
/// //////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";

/// //////////////////////////////////////////////////////////////////
// Importing web components from other jsx files
/// //////////////////////////////////////////////////////////////////
import UserProfile from "./components/UserProfile.js";
import GameBarButtons from "./components/GameBarButtons.js";
import GameBackgroundImage from "./components/GameBackgroundImage.js";

const NPC_URL = `${API_URL  }/npcs/`;

// Linking to Games
const GAME_URL = `${API_URL  }/games/`;
function UserFloor() {
  const [floorId, setFloorId] = React.useState(null);
  const [userImageUrl, setUserImageUrl] = React.useState(null);
  React.useEffect(() => {
    if (floorId != null) {
      axios({
        method: 'get',
        url: NPC_URL + floorId
      }).then(response => {
        const oldNpcImageUrl = window.localStorage.getItem('npcImageURL');
        localStorage.setItem('npcImageURL', response.data[0].imageurl);
        localStorage.setItem('npcId', response.data[0].npcid);
        const newNpcImageUrl = window.localStorage.getItem('npcImageURL');
        if (oldNpcImageUrl != newNpcImageUrl) {
          location.reload();
        }

        // Get npcId from localStorage
        const npcId = localStorage.getItem('npcId');
        // Get Game Details  
        axios({
          method: 'get',
          url: GAME_URL + npcId
        }).then(response => {
          localStorage.setItem('gameURL', response.data.gamename);
        }).catch(error => {
          console.log(error);
        });
      }).catch(error => {
        console.log(error);
      });
    }
  }, [floorId]);
  React.useEffect(() => {
    if (userImageUrl != null) {
      // PixiJS Canvas Size
      const app = new PIXI.Application({
        width: 1540,
        height: 620,
        transparent: true
      });
      document.body.appendChild(app.view);

      // PixiJS Container
      const container = new PIXI.Container();
      app.stage.addChild(container);

      // Player Object
      const texture = PIXI.Texture.from(`../images/${  userImageUrl}`);
      const player = new PIXI.Sprite(texture);
      container.addChild(player);

      // Player Size
      player.scale.x = 0.33;
      player.scale.y = 0.33;

      // Player Position
      player.position.y = 420;
      const npcImageURL = localStorage.getItem('npcImageURL');

      // NPC Object
      const texture2 = PIXI.Texture.from(`../images/${  npcImageURL}`);
      const npc = new PIXI.Sprite(texture2);
      container.addChild(npc);

      // NPC Size
      npc.scale.x = 0.33;
      npc.scale.y = 0.33;

      // NPC Position
      npc.position.y = 420;
      npc.position.x = 1200;

      // Border Object
      const rect = new PIXI.Graphics();
      rect.beginFill(0xFFFF00);

      // Draw a rectangle
      rect.drawRect(0, 0, 10, 300);
      container.addChild(rect);

      // Border Position
      rect.position.y = 300;
      rect.position.x = -10;

      // Keyboard Event Listener
      window.addEventListener("keydown", keyDown);
      window.addEventListener("keyup", keyUp);
      app.ticker.add(gameLoop);
      const keys = {};
      function keyDown(event) {
        keys[event.keyCode] = true;
      }
      function keyUp(event) {
        keys[event.keyCode] = false;
      }
      function gameLoop() {
        // Keyboard Input 'D'
        if (keys["68"]) {
          player.x += 5;
        }

        // Keyboard Input 'S'
        if (keys["65"]) {
          player.x -= 5;
        }

        // If Player and NPC intersect
        if (intersect(player, npc)) {
          player.x = 0;

          // Get npcId from localStorage
          const gameURL = localStorage.getItem('gameURL');
          const npcId = localStorage.getItem('npcId');

          // Redirect users to respective game with npc details
          window.location.href = `/user/dialogue_interaction.html?npcid=${npcId}`;
        }

        // If Player and NPC intersect
        if (intersect(player, rect)) {
          player.x = 5;
        }
      }
      function intersect(a, b) {
        const aBox = a.getBounds();
        const bBox = b.getBounds();
        return aBox.x + aBox.width > bBox.x && aBox.x < bBox.x + bBox.width && aBox.y < aBox.height + bBox.y && aBox.y < bBox.y + bBox.height;
      }
    }
  }, [userImageUrl]);
  return /* #__PURE__ */React.createElement("div", {
    className: "topBar"
  }, /* #__PURE__ */React.createElement(UserProfile, {
    setFloorId,
    setUserImageUrl
  }), /* #__PURE__ */React.createElement(GameBarButtons, null), /* #__PURE__ */React.createElement(GameBackgroundImage, {
    floorId
  }));
}

// To render onto HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /* #__PURE__ */React.createElement(UserFloor, null));