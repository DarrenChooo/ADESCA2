// IMAGE_URL = IMAGE_URL + '/images/';

export default function RetrievePosts(props) {
  return /*#__PURE__*/React.createElement("div", {
    id: "contentBody"
  }, props.posts.map(response => {
    return /*#__PURE__*/React.createElement("a", {
      href: "/admin/react_view_post.html?postid=" + response.postid,
      className: "card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "textContainer"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "mainText"
    }, response.postdesc), /*#__PURE__*/React.createElement("h3", {
      className: "subText"
    }, "USER ID: ", response.userid), /*#__PURE__*/React.createElement("h3", {
      className: "subText"
    }, "Post ID: ", response.postid), /*#__PURE__*/React.createElement("a", {
      className: "button",
      href: "/admin/react_update_post.html?postid=" + response.postid
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      id: "updateIdButton"
    }, "Update"))));
  }));
}