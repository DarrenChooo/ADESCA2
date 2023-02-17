/// //////////////////////////////////////////////////////////////////
// Linking to npcs, users, floors, currency, and images url
/// //////////////////////////////////////////////////////////////////
NPC_URL = `${API_URL  }/npcs`;
FLOOR_URL = `${API_URL  }/floors/`;
USER_URL = `${API_URL  }/users/`;
IMAGE_URL += '/images/';
CURRENCY_URL = `${API_URL  }/currency/`;
export default function TicTacToeTable(props) {
  const [box0, setBox0] = React.useState("");
  const [box1, setBox1] = React.useState("");
  const [box2, setBox2] = React.useState("");
  const [box3, setBox3] = React.useState("");
  const [box4, setBox4] = React.useState("");
  const [box5, setBox5] = React.useState("");
  const [box6, setBox6] = React.useState("");
  const [box7, setBox7] = React.useState("");
  const [box8, setBox8] = React.useState("");
  const [whosTurn, setWhosTurn] = React.useState(`It's your turn!`);

  // Get user id and npc id from local storage
  const getUserId = localStorage.getItem('userid');
  const getNpcId = localStorage.getItem('npcId');

  // Initalize variables used for the game
  const user = [1, 'X']; // [playerNumber, symbol]
  const comp = [2, 'O'];
  const tileNum = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const winCombi = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 1, 2], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  let currentPlayer;
  const userTiles = [];
  const compTiles = [];
  const boardArr = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];
  const winner = 0;
  const turnCount = 1;
  React.useEffect(() => {
    // axios get request for dialogue data   
    axios.get(`${API_URL  }/${getDialogueId}`, {})

    // response successful
    .then(response => {
      // console.log(response.data[0].dialogueid)
      setDialogueId(response.data[0].dialogueid);
      setDialogueDesc(response.data[0].dialoguedesc);
      setNpcId(response.data[0].npcid);
      setPlotId(response.data[0].plotid);
      setStateId(response.data[0].stateid);
    })

    // error
    .catch(error => {
      console.log(error);
    });
  }, []);

  // function to update state of dialogueId using setDialogueId when the input is updated in the input element
  const handleBox0Click = event => {
    // update dialogueId
    setBox0(user[1]);
    if (whosTurn === `It's your turn!`) {
      setWhosTurn(`It's ${npcName}'s turn!`);
    } else {
      setWhosTurn(`It's your turn!`);
    }
    console.log(`Dialogue Desc: ${  dialogueId}`);
  };

  // function to send axios request using the inputs
  const handleSubmitForm = event => {
    event.preventDefault();
    console.log(`Dialogue Desc: ${  dialogueId}`);
    console.log(`Dialogue Desc: ${  dialogueDesc}`);
    console.log(`NPC Id: ${  npcId}`);
    console.log(`Plot Id: ${  plotId}`);
    console.log(`State Id: ${  stateId}`);

    // send axios request to update dialogue
    axios.put(`${API_URL  }/${dialogueId}`, {
      dialogueDesc,
      npcId,
      plotId,
      stateId
    })
    // response successful
    .then(response => {
      console.log(response.data);
      alert(`Dialogue ${dialogueId} for NPC no. ${npcId} has been updated!`);
      window.location.href = "/admin/react_manage_dialogues.html";
    })
    // error
    .catch(error => {
      console.log(error);
      alert(error);
    });
  };
  return /* #__PURE__ */React.createElement("div", {
    id: "board"
  }, /* #__PURE__ */React.createElement("table", null, /* #__PURE__ */React.createElement("tr", {
    className: "top"
  }, /* #__PURE__ */React.createElement("td", {
    id: "0",
    className: "left",
    value: box0
  }), /* #__PURE__ */React.createElement("td", {
    id: "1",
    className: "centre"
  }), /* #__PURE__ */React.createElement("td", {
    id: "2",
    className: "right"
  })), /* #__PURE__ */React.createElement("tr", {
    className: "mid"
  }, /* #__PURE__ */React.createElement("td", {
    id: "3",
    className: "left"
  }), /* #__PURE__ */React.createElement("td", {
    id: "4",
    className: "centre"
  }), /* #__PURE__ */React.createElement("td", {
    id: "5",
    className: "right"
  })), /* #__PURE__ */React.createElement("tr", {
    className: "bot"
  }, /* #__PURE__ */React.createElement("td", {
    id: "6",
    className: "left"
  }), /* #__PURE__ */React.createElement("td", {
    id: "7",
    className: "centre"
  }), /* #__PURE__ */React.createElement("td", {
    id: "8",
    className: "right"
  }))));
}