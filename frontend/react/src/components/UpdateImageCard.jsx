import UpdateImageForm from "./UpdateImageForm";

export default function UpdateImageCard(props) {
  return (
    <div className="card">
      <img className="image" src={IMAGE_URL + props.image.imageurl} />
      <div className="textContainer">
        <h1 className="mainText">{props.image.imagename}</h1>
        <UpdateImageForm image={props.image} />
      </div>
    </div>
  );
}
