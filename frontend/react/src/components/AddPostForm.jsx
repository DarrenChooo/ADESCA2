export default function AddPostForm(props) {
    const [userid, setuserid] = React.useState("");
    const [postdesc, setpostdesc] = React.useState("");

    // function to update state of npcName using setNpcName when the input is updated in the input element
    const handlePostInput = event => {

        // update npcName
        setpostDesc(event.target.value)
        console.log("New Post:" + postdesc);
    }


    // function to send axios request using the inputs
    const handleSubmitForm = event => {
        event.preventDefault();

        // send axios request to insert npc
        axios.post(API_URL, {
            postdesc: postdesc,
            userid: userid,
        })
            // response successful
            .then((response) => {
                console.log(response.data);
                alert(`New post has been created!`);
                window.location.href = "/user/react_manage_posts.html";
            })

            // if error is caught
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }

    return (
        <div className="card">
            <div className="dataCtn">
                <form onSubmit={handleSubmitForm}>
                    <div className="input">
                        <input type="text" id="UPDATEquantityInput" placeholder="This is my new post!" onChange={handlePostInput} />
                        <label className="inputLabel">Post Desc:</label>
                    </div>

                    <div className="Button2">
                        <button id="submitBtn" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}