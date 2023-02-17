export default function RetrieveItems(props) {
  return (
    <div id="itemsContent">
      {props.items.map((item) => {
        return (
          <a href={"/admin/react_update_item.html?itemid=" + item.itemid} className="card">
            <img className="image" src={IMAGE_URL + item.imageurl} />
            <div className="textContainer">
              <h3 className="mainText">{item.itemname}</h3>
              <h3 className="subText">Item ID: {item.itemid}</h3>
              <h3 className="subText">Item Cost - {item.cost}</h3>
              <h3 className="subText">
                Minimum Level: {item.levelreq}
              </h3>
            </div>
          </a>
        );
      })}
    </div>
  );
}
