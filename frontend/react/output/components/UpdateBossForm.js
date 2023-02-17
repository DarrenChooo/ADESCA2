export default function UpdateBossForm(props) {
  const boss = props.boss;

  // Declaring state variables for Boss attributes
  const [bossName, setBossName] = React.useState("");
  const [bossHealth, setBossHealth] = React.useState("");
  const [bossReward, setBossReward] = React.useState("");
  const [bossImage, setBossImage] = React.useState("");

  // Sets input values to original boss stats upon component recieving props values
  React.useEffect(() => {
    setBossName(boss.bossname);
    setBossHealth(boss.bosshealth);
    setBossReward(boss.bossreward);
    setBossImage(boss.imageid);
  }, [boss]);

  // Handles changes in the Boss Name input field by updating state of bossName
  const handleBossNameChange = event => {
    setBossName(event.target.value);
  };

  // Handles changes in the Boss Health input field by updating state of bossHealth
  const handleBossHealthChange = event => {
    setBossHealth(event.target.value);
  };

  // Handles changes in the Boss Reward input field by updating state of bossReward
  const handleBossRewardChange = event => {
    setBossReward(event.target.value);
  };

  // Handles changes in the Boss Image input field by updating state of bossImage
  const handleBossImageChange = event => {
    setBossImage(event.target.value);
  };
  const handleUpdate = event => {
    event.preventDefault();

    // Axios request to update Boss attributes
    axios.put(API_URL + `1`, {
      bossname: bossName,
      bosshealth: bossHealth,
      bossreward: bossReward,
      imageid: bossImage
    }).then(function () {
      alert(`Boss has been updated`);
      window.location.reload();
    }).catch(error => {
      console.log(error);
    });
  };
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: handleUpdate
  }, /*#__PURE__*/React.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React.createElement("label", {
    className: "inputLabel"
  }, "Input Boss Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "updateBossName",
    value: bossName,
    onChange: handleBossNameChange,
    placeholder: bossName,
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React.createElement("label", {
    className: "inputLabel"
  }, "Input Boss Health:"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    id: "updateBossHealth",
    value: bossHealth,
    onChange: handleBossHealthChange,
    placeholder: "Eg: '50'",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React.createElement("label", {
    className: "inputLabel"
  }, "Input Boss Reward"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    id: "updateBossReward",
    value: bossReward,
    onChange: handleBossRewardChange,
    placeholder: "Eg: '100'",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React.createElement("label", {
    className: "inputLabel"
  }, "Input Boss Image ID"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    id: "updateBossImage",
    value: bossImage,
    onChange: handleBossImageChange,
    placeholder: "Eg: '26'",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "button-container"
  }, /*#__PURE__*/React.createElement("button", {
    className: "button",
    type: "submit",
    id: "updateButton"
  }, "Update")));
}