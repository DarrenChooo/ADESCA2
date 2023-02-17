const express = require('express')

const router = express.Router()

const controller = require("../controller/gamesController")

/// ///////////////////////////////////////////////////
// To test, postman -> http://localhost:3000/game/<gameId>
/// ///////////////////////////////////////////////////
router.get("/:gameId", controller.getGame)

module.exports = router