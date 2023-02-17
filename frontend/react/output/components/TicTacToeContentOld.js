/// //////////////////////////////////////////////////////////////////
// Importing web components from other jsx files
/// //////////////////////////////////////////////////////////////////
import TicTacToeTable from "./components/TicTacToeTable.js";
import TicTacToePlayerPic from "./components/TicTacToePlayerPic.js";
import TicTacToePlayerTurn from "./components/TicTacToePlayerTurn.js";

export default function TicTacToeContent(props) {
  return /* #__PURE__ */React.createElement("div", null, /* #__PURE__ */React.createElement(TicTacToePlayerTurn, {
    whosTurn
  }), /* #__PURE__ */React.createElement("div", {
    id: "content"
  }, /* #__PURE__ */React.createElement(TicTacToePlayerPic, null), /* #__PURE__ */React.createElement("div", {
    id: "board"
  }, /* #__PURE__ */React.createElement("table", null, /* #__PURE__ */React.createElement("tr", {
    className: "top"
  }, /* #__PURE__ */React.createElement("td", {
    id: "0",
    className: "left",
    value: box0,
    onClick: handleBox0Click
  }), /* #__PURE__ */React.createElement("td", {
    id: "1",
    className: "centre",
    value: box1,
    onClick: handleBox1Click
  }), /* #__PURE__ */React.createElement("td", {
    id: "2",
    className: "right",
    value: box2,
    onClick: handleBox2Click
  })), /* #__PURE__ */React.createElement("tr", {
    className: "mid"
  }, /* #__PURE__ */React.createElement("td", {
    id: "3",
    className: "left",
    value: box3,
    onClick: handleBox3Click
  }), /* #__PURE__ */React.createElement("td", {
    id: "4",
    className: "centre",
    value: box4,
    onClick: handleBox4Click
  }), /* #__PURE__ */React.createElement("td", {
    id: "5",
    className: "right",
    value: box5,
    onClick: handleBox5Click
  })), /* #__PURE__ */React.createElement("tr", {
    className: "bot"
  }, /* #__PURE__ */React.createElement("td", {
    id: "6",
    className: "left",
    value: box6,
    onClick: handleBox6Click
  }), /* #__PURE__ */React.createElement("td", {
    id: "7",
    className: "centre",
    value: box7,
    onClick: handleBox7Click
  }), /* #__PURE__ */React.createElement("td", {
    id: "8",
    className: "right",
    value: box8,
    onClick: handleBox8Click
  }))))));
}