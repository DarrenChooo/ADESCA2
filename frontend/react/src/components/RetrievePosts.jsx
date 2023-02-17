// IMAGE_URL = IMAGE_URL + '/images/';

export default function RetrievePosts(props) {

    return (
        <div id="contentBody">
            {props.posts.map((response) => {
                return (
                    <a href={"/admin/react_view_post.html?postid=" + response.postid} className="card">
                            <div className="textContainer">
                                <h3 className="mainText">{response.postdesc}</h3>
                                <h3 className="subText">USER ID: {response.userid}</h3>
                                <h3 className="subText">Post ID: {response.postid}</h3>
                                <a className="button" href={"/admin/react_update_post.html?postid="+response.postid}>
                                <button type="button" id="updateIdButton">Update</button>
                            </a>
                            </div>
                    </a>
                )
            })}
        </div>
    )
}