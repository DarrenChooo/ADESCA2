export default function ItemsHeader(props) {
  return (
    <header>
      <a className="backBtn" onClick={() => history.back()}>
        <i id="backIcon" className="fa-solid fa-chevron-left"></i>
        <span>Back</span>
      </a>
      <center className="wrap">{props.title}</center>
    </header>
  );
}
