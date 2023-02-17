API_URL = `${API_URL}/image/`;
IMAGE_URL = `${IMAGE_URL}/images/`;

export default function RetrieveImages(props) {

    return(
        <div id="imagesContent">
        {props.images.map((image) => {
            return (
                
                    <a href={"/admin/react_update_image.html?imageid=" + image.imageid} className="card">
                    <img className="image" src={IMAGE_URL + image.imageurl}/>
                        <div className = "textContainer">
                            <h3 className="mainText">{image.imagename}</h3>
                            <h3 className="subText">ImageID: {image.imageid}</h3>
                            <h3 className="subText">Image Category - {image.imagesorter}</h3>
                        </div>
                </a>
            )
        })}
        </div>
    );


}