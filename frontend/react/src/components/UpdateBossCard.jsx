import UpdateBossForm from "./UpdateBossForm";

export default function UpdateBossCard(props) {

    const [boss, setBoss] = React.useState([]);
    React.useEffect(function () {
      axios
        .get(API_URL + `1`)
        .then(function (response) {
          setBoss(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
    
    return (
    <div className="card">
        <img className="image" src={IMAGE_URL + boss.imageurl} />
            <div className = "textContainer">
                <h1 className="mainText">{boss.bossname}</h1>
                <UpdateBossForm boss={boss} />
            </div>
    </div>
  );
}
