const post = require('../model/postboardModel');

module.exports.getAllpost = (req, res, next) => {
    post.getAllPostM()
    .then((result) => {
        res.status(200).send(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Failed to get postboard')
    })
};

module.exports.getPostById = (req, res, next) => {
    // Get params id 
    const {postid} = req.params

    post.getPostByIdM(postid)
    .then((result) => {
        res.status(200).send(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Failed to get post by post id')
    })
}

module.exports.createPost = (req,res,next) => {
    const createPost = req.body.postdesc;
    const {userid} = req.params;
    
    post.createPostM(createPost, userid)
    .then((result) =>{
        console.log(result)
        res.status(201).send('Created Successfully')
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Unable to create post.')
    })
}

module.exports.createPostByBody = (req,res,next) => {
    const createPost = req.body.postdesc;
    const {userid} = req.body;
    
    post.createPostM(createPost, userid)
    .then((result) =>{
        console.log(result)
        res.status(201).send('Created Successfully')
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Unable to create post.')
    })
}

module.exports.updateUserPostByPostid = (req, res, next) => {
    const {postid} = req.params;
    const {postdesc} = req.body;

    post.updateUserPostByPostIdM(postdesc,postid)
    .then(() => {
        res.status(200).send(`Updated Successfully`);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Unable to update')
    })
};

module.exports.updateUserPostByPostidBody = (req, res, next) => {
    const {postid} = req.body;
    const {postdesc} = req.body;

    post.updateUserPostByPostIdM(postdesc,postid)
    .then(() => {
        res.status(200).send(`Updated Successfully`);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Unable to update')
    })
};

module.exports.deletePostByID = (req,res,next) => {

    const {postid} = req.params

    post.deletePostByIdM(postid)
    .then((result) =>{
        res.send(result)
    })
    .catch((err) =>{
        console.log(err);
        res.status(500).send('Failed to delete post. Please try again')
    })
};

module.exports.getPostByUserId = (req, res, next) => {
    // Get params id 
    const {userid} = req.params

    post.getPostByUserIdM(userid)
    .then((result) => {
        res.status(200).send(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Failed to get post by post id')
    })
}