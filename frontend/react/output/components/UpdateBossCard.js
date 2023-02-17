import UpdateBossForm from "./UpdateBossForm.js";
export default function UpdateBossCard(props) {
  const [boss, setBoss] = React.useState([]);
  React.useEffect(function () {
    axios.get(API_URL + `1`).then(function (response) {
      setBoss(response.data);
    }).catch(error => {
      console.log(error);
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("img", {
    className: "image",
    src: IMAGE_URL + boss.imageurl
  }), /*#__PURE__*/React.createElement("div", {
    className: "textContainer"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "mainText"
  }, boss.bossname), /*#__PURE__*/React.createElement(UpdateBossForm, {
    boss: boss
  })));
}