/////////////////////////////////////////////////////////////////////
//Getting post id from the URL
/////////////////////////////////////////////////////////////////////
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let postId = urlParams.get('postid');
console.log(postId)

export default function UpdatePostForm(props) {
    const [postdesc, setPostDesc] = React.useState("");
    const [results, setResults] = React.useState([]);

    //constantly update the state of the input
    const handlePostChange = event => {
        //event.target.value is the value of the input
        setPostDesc(event.target.value)
        console.log(postdesc)
    }

    const handleSubmitForm = event => {
        //prevent page from refreshing
        event.preventDefault();
        


        // send axios request to update post
        axios.put(API_URL + `/${postId}`, {
            postdesc: postdesc
        })
            // response successful
            .then((response) => {
                console.log(response.data);
                setTimeout(() => {
                alert(`POST HAS BEEN updated!`);
                }, 300);

            })
            // error
            .catch((error) => {
                console.log(error);
                alert(error);
            })
    }



    return ( 
            <form id="updateForm" onSubmit={handleSubmitForm}>
                <div className="currencyCard">
                    <div className="dataCtn">
                   <div className="formRow">
                            <input id="UPDATEquantityInput" type="text" placeholder="this is my new updated post" onChange={handlePostChange} />
                            <label>New Post Desc: </label>
                        </div>
                        <div className="Button2">
                            <button type="submit" id="updateIdButton">Update</button>
                        </div>
                       
                    </div>
                    {results}
                </div>
            </form>   
    );


}
