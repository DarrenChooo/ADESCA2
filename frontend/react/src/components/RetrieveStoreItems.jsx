export default function RetrieveStoreItems(props) {
  return (
    <div className="layout" id="storeItems">
      {props.items.map((item) => {
        return (
          <a href={"react_store_item.html?itemid=" + item.itemid} className="card">
            <div className="image-container">
              <img
                alt={item.itemname}
                src={IMAGE_URL + item.imageurl}
              />
            </div>
            <h3 className="item-title">{item.itemname}</h3>
            <span className="item-title">Cost: {item.cost}</span>
          </a>
        );
      })}
    </div>
  );
}
