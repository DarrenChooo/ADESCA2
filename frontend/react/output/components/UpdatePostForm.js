/////////////////////////////////////////////////////////////////////
//Getting post id from the URL
/////////////////////////////////////////////////////////////////////
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let postId = urlParams.get('postid');
console.log(postId);
export default function UpdatePostForm(props) {
  const [postdesc, setPostDesc] = React.useState("");
  const [results, setResults] = React.useState([]);

  //constantly update the state of the input
  const handlePostChange = event => {
    //event.target.value is the value of the input
    setPostDesc(event.target.value);
    console.log(postdesc);
  };
  const handleSubmitForm = event => {
    //prevent page from refreshing
    event.preventDefault();

    // send axios request to update post
    axios.put(API_URL + `/${postId}`, {
      postdesc: postdesc
    })
    // response successful
    .then(response => {
      console.log(response.data);
      setTimeout(() => {
        alert(`POST HAS BEEN updated!`);
      }, 300);
    })
    // error
    .catch(error => {
      console.log(error);
      alert(error);
    });
  };
  return /*#__PURE__*/React.createElement("form", {
    id: "updateForm",
    onSubmit: handleSubmitForm
  }, /*#__PURE__*/React.createElement("div", {
    className: "currencyCard"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dataCtn"
  }, /*#__PURE__*/React.createElement("div", {
    className: "formRow"
  }, /*#__PURE__*/React.createElement("input", {
    id: "UPDATEquantityInput",
    type: "text",
    placeholder: "this is my new updated post",
    onChange: handlePostChange
  }), /*#__PURE__*/React.createElement("label", null, "New Post Desc: ")), /*#__PURE__*/React.createElement("div", {
    className: "Button2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    id: "updateIdButton"
  }, "Update"))), results));
}