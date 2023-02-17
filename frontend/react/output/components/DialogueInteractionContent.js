/////////////////////////////////////////////////////////////////////
//Linking to dialogues
/////////////////////////////////////////////////////////////////////
const DIALOGUE_URL = API_URL + '/dialogues';
const USER_URL = API_URL + '/users/';
const GAME_URL = API_URL + '/games/';

/////////////////////////////////////////////////////////////////////
//Importing React libraries
/////////////////////////////////////////////////////////////////////
import React, { useEffect } from "react";

/////////////////////////////////////////////////////////////////////
// Initalize Constants
/////////////////////////////////////////////////////////////////////
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const getNpcId = urlParams.get('npcid');
let dialogueid = 1;
let plotid = window.localStorage.getItem('plotid');
window.localStorage.setItem('userid', 8);
window.localStorage.setItem('floorid', 1);
const userid = window.localStorage.getItem('userid');
const floorid = window.localStorage.getItem('floorid');
export default function DialogueInteractionContent(props) {
  const [dialogue, setDialogue] = React.useState("");
  // const [npcName, setNpcName] = React.useState("");
  // const [npcImageUrl, setNpcImageUrl] = React.useState("");

  React.useEffect(() => {
    let plotid = window.localStorage.getItem('plotid');
    // axios get request for dialogue data  
    axios.get(DIALOGUE_URL + `/display/${getNpcId}/${plotid}`, {}).then(response => {
      console.log(response.data);

      // let dialogueid = response.data[0].dialogueid - 1
      let dialogueid = 1;
      console.log(dialogueid);

      // To let first dialogue to auto display instead of needing users to click on next first
      dialogueDisplay.innerHTML = "";
      let dialogue = response.data[dialogueid - 1].dialoguedesc;
      console.log(dialogue);
      console.log(dialogueid);

      // Display with animation
      for (let i = 0; i < dialogue.length; i++) {
        dialogueDisplay.innerHTML += `<span id='char${i}'>${dialogue.charAt(i)}</span>`;
      }
      for (let i = 0; i < dialogue.length; i++) {
        gsap.fromTo(`#char${i}`, {
          opacity: 0
        }, {
          delay: i * 0.02,
          opacity: 1,
          duration: 0.2
        });
      }

      // skip animation and display the whole line straight
      dialogueDisplay.addEventListener("click", () => {
        dialogueDisplay.innerHTML = dialogue;
      });
    }).catch(error => {
      console.log(error);
      alert(error);
    });
  }, []);
  const nextBtn = () => {
    // dialogueid will increment every click, which can be used to select the dialogue description index 
    dialogueid++;
    console.log("button is clicked" + dialogueid);
    axios.get(DIALOGUE_URL + `/display/${getNpcId}/${plotid}`, {}).then(response => {
      if (dialogueid <= response.data.length) {
        dialogueDisplay.innerHTML = "";
        console.log(response.data[dialogueid - 1].dialoguedesc);

        // let dialogue = response.data[dialogueid - 1].dialoguedesc;
        setDialogue(response.data[dialogueid - 1].dialoguedesc);
        console.log(dialogue);
        console.log(dialogueid);

        // Display with animation
        for (let i = 0; i < dialogue.length; i++) {
          dialogueDisplay.innerHTML += `<span id='char${i}'>${dialogue.charAt(i)}</span>`;
        }
        for (let i = 0; i < dialogue.length; i++) {
          gsap.fromTo(`#char${i}`, {
            opacity: 0
          }, {
            delay: i * 0.02,
            opacity: 1,
            duration: 0.2
          });
        }

        // skip animation and display the whole line straight
        dialogueDisplay.addEventListener("click", () => {
          dialogueDisplay.innerHTML = dialogue;
        });
      } else {
        alert(`You have completed the conversation with ${localStorage.getItem('npcName')}`);

        // axios get request for game data
        axios.get(GAME_URL + `${getNpcId}`, {})
        // response successful
        .then(response => {
          localStorage.setItem('gameURL', response.data.gamename);
          const gameURL = localStorage.getItem('gameURL');
          window.location.assign(`/user/${gameURL}.html`);
        })
        // error
        .catch(error => {
          console.log(error);
          alert("Congratulations! You have completed all the games.");
          window.location.assign(`/user/floor.html`);
        });
      }
    }).catch(error => {
      console.log(error);
      alert(error);
    });
  };
  const backBtn = () => {
    axios.get(DIALOGUE_URL + `/display/${getNpcId}/${plotid}`, {}).then(response => {
      if (dialogueid <= response.data.length) {
        --dialogueid;
        dialogueDisplay.innerHTML = "";
        let dialogue = response.data[dialogueid - 1].dialoguedesc;
        console.log(dialogue);
        console.log(dialogueid);
        setDialogue(response.data[dialogueid - 1].dialoguedesc);

        // Display with animation
        for (var i = 0; i < dialogue.length; i++) {
          dialogueDisplay.innerHTML += `<span id='char${i}'>${dialogue.charAt(i)}</span>`;
        }
        for (var i = 0; i < dialogue.length; i++) {
          gsap.fromTo(`#char${i}`, {
            opacity: 0
          }, {
            delay: i * 0.02,
            opacity: 1,
            duration: 0.2
          });
        }

        // skip animation and display the whole line straight
        dialogueDisplay.addEventListener("click", () => {
          dialogueDisplay.innerHTML = dialogue;
        });
      } else {
        alert(`You have completed the conversation with ${localStorage.getItem('npcName')}`);
        axios.get(GAME_URL + `${getNpcId}`, {}).then(response => {
          localStorage.setItem('gameURL', response.data.gamename);
          const gameURL = localStorage.getItem('gameURL');
          window.location.assign(`/user/${gameURL}.html`);
        }).catch(error => {
          console.log(error);
        });
      }
    }).catch(error => {
      console.log(error);
      alert(error);
    });
  };
  const plot2Clicked = () => {
    choosePlot.innerHTML = " ";
    axios.put(USER_URL + `/updateplot/${userid}/2`, {})
    // response sucessful
    .then(response => {
      console.log(response.data);
      localStorage.setItem('plotid', 2);
      window.location.reload();
    })

    // error response
    .catch(error => {
      console.log(error);
      alert(error);
    });
  };
  const plot3Clicked = () => {
    choosePlot.innerHTML = " ";
    axios.put(USER_URL + `/updateplot/${userid}/3`, {})
    // response sucessful
    .then(response => {
      console.log(response.data);
      localStorage.setItem('plotid', 3);
      window.location.reload();
    })

    // error response
    .catch(error => {
      console.log(error);
      alert(error);
    });
  };
  const plot4Clicked = () => {
    choosePlot.innerHTML = " ";
    axios.put(USER_URL + `/updateplot/${userid}/4`, {})
    // response sucessful
    .then(response => {
      console.log(response.data);
      localStorage.setItem('plotid', 4);
      window.location.reload();
    })

    // error response
    .catch(error => {
      console.log(error);
      alert(error);
    });
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    id: "card"
  }, /*#__PURE__*/React.createElement("div", {
    id: "dialogueDisplay"
  }), dialogueid === 10 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    id: "choosePlot"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "choosePlotBtn",
    id: "plot2",
    type: "button",
    onClick: plot2Clicked
  }, "I'm here for a treasure hunt. ")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "choosePlotBtn",
    id: "plot3",
    type: "button",
    onClick: plot3Clicked
  }, "I'm looking for my long-lost family. ")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "choosePlotBtn",
    id: "plot4",
    type: "button",
    onClick: plot4Clicked
  }, "I'm here for an adventure. ")))), /*#__PURE__*/React.createElement("div", {
    id: "npcPic"
  }, /*#__PURE__*/React.createElement("img", {
    className: "image",
    src: IMAGE_URL + props.npcImageUrl,
    width: "100%",
    height: "60%"
  }), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement("h2", null, props.npcName)))), /*#__PURE__*/React.createElement("div", {
    id: "btnSection"
  }, /*#__PURE__*/React.createElement("button", {
    id: "backIntroDialogue",
    type: "button",
    onClick: backBtn
  }, "Back"), /*#__PURE__*/React.createElement("button", {
    id: "getIntroDialogue",
    type: "button",
    onClick: nextBtn
  }, "Next")));
}