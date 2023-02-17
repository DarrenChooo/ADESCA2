import UpdateItemForm from "./UpdateItemForm";

export default function UpdateItemCard(props) {
  return (
    <div class="card">
      <img class="image" src={IMAGE_URL + props.item.imageurl} />
      <div class="textContainer">
        <h1 class="mainText">{props.item.itemname}</h1>
        <UpdateItemForm />
      </div>
    </div>
  );
}
