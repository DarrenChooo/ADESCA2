/////////////////////////////////////////////////////////////////////
//Getting dialogue id from the URL
/////////////////////////////////////////////////////////////////////
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let getDialogueId = urlParams.get('dialogueid');
export default function UpdateDialogueForm(props) {
  const [dialogueId, setDialogueId] = React.useState("");
  const [dialogueDesc, setDialogueDesc] = React.useState("");
  const [npcId, setNpcId] = React.useState("");
  const [plotId, setPlotId] = React.useState("");
  const [stateId, setStateId] = React.useState("");
  React.useEffect(() => {
    // axios get request for dialogue data   
    axios.get(API_URL + `/${getDialogueId}`, {})

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
      if (error.response.status == 400) {
        alert(`Error: Dialogue Id ${getDialogueId} does not exist.`);
      }
      // alert(error.message)
      console.log(error);
    });
  }, []);

  // function to update state of dialogueId using setDialogueId when the input is updated in the input element
  const handleDialogueIdInput = event => {
    // update dialogueId
    setDialogueId(event.target.value);
    console.log("Dialogue Desc: " + dialogueId);
  };

  // function to update state of dialogueDesc using setDialogueDesc when the input is updated in the input element
  const handleDialogueDescInput = event => {
    // update dialogueDesc
    setDialogueDesc(event.target.value);
    // event.target.value = dialogueDesc
    console.log("Dialogue Desc: " + dialogueDesc);
  };

  // function to update state of npcId using setNpcId when the input is updated in the input element
  const handleNpcIdInput = event => {
    // update npcId
    setNpcId(event.target.value);
    console.log("NPC Id: " + npcId);
  };

  // function to update state of plotId using setPlotId when the input is updated in the input element
  const handlePlotIdInput = event => {
    // update PlotId
    setPlotId(event.target.value);
    console.log("Plot Id: " + plotId);
  };

  // function to update state of stateId using setStateId when the input is updated in the input element
  const handleStateIdInput = event => {
    // update stateId
    setStateId(event.target.value);
    // event.target.value = stateId
    console.log("State Id: " + stateId);
  };

  // function to send axios request using the inputs
  const handleSubmitForm = event => {
    event.preventDefault();
    console.log("Dialogue Desc: " + dialogueId);
    console.log("Dialogue Desc: " + dialogueDesc);
    console.log("NPC Id: " + npcId);
    console.log("Plot Id: " + plotId);
    console.log("State Id: " + stateId);

    // send axios request to update dialogue
    axios.put(API_URL + `/${dialogueId}`, {
      dialogueDesc: dialogueDesc,
      npcId: npcId,
      plotId: plotId,
      stateId: stateId
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
  return /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dataCtn"
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmitForm
  }, /*#__PURE__*/React.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "dialogueIdIpt",
    placeholder: "Eg: 22",
    value: dialogueId,
    onChange: handleDialogueIdInput
  }), /*#__PURE__*/React.createElement("label", {
    className: "inputLabel"
  }, "Dialogue ID")), /*#__PURE__*/React.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "dialogueDescIpt",
    placeholder: "Eg: Welcome to Stardust Neverland!",
    value: dialogueDesc,
    onChange: handleDialogueDescInput
  }), /*#__PURE__*/React.createElement("label", {
    className: "inputLabel"
  }, "Dialogue Description")), /*#__PURE__*/React.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "npcIdIpt",
    placeholder: "Eg: 22",
    value: npcId,
    onChange: handleNpcIdInput
  }), /*#__PURE__*/React.createElement("label", {
    className: "inputLabel"
  }, "NPC ID")), /*#__PURE__*/React.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "plotIdIpt",
    placeholder: "Eg: 1",
    value: plotId,
    onChange: handlePlotIdInput
  }), /*#__PURE__*/React.createElement("label", {
    className: "inputLabel"
  }, "Plot ID")), /*#__PURE__*/React.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "stateIdIpt",
    placeholder: "Eg: 0",
    value: stateId,
    onChange: handleStateIdInput
  }), /*#__PURE__*/React.createElement("label", {
    className: "inputLabel"
  }, "State ID")), /*#__PURE__*/React.createElement("div", {
    className: "btnCtn"
  }, /*#__PURE__*/React.createElement("button", {
    id: "submitBtn",
    type: "submit"
  }, "Submit")))));
}