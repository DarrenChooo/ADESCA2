const express = require('express')

const router = express.Router()

const controller = require("../controller/postboardController")

router.get("/", controller.getAllpost)

/// ///////////////////////////////////////////////////
// To test, postman -> http://localhost:5000/posts/...
/// ///////////////////////////////////////////////////
router.post("/:userid", controller.createPost)
router.post("/", controller.createPostByBody)
router.get("/:postid", controller.getPostById)
router.get("/user/:userid", controller.getPostByUserId)
router.put("/:postid", controller.updateUserPostByPostid)
router.put("/", controller.updateUserPostByPostidBody)
router.delete("/:postid", controller.deletePostByID)

module.exports = router