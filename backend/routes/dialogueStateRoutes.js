/// ///////////////////////////////////////////////////
// INCLUDES
/// ///////////////////////////////////////////////////
const express = require('express')

const router = express.Router()

const controller = require("../controller/dialogueStateController")

/// ///////////////////////////////////////////////////
// Backend testing via Postman -> http://localhost:3000/api/dialogueState/addDialogueState
/// ///////////////////////////////////////////////////
router.post("/addDialogueState", controller.insertDialogueState);

/// ///////////////////////////////////////////////////
// Backend testing via Postman -> http://localhost:3000/api/dialogueState/updateState/<npcId>/<userId>
/// ///////////////////////////////////////////////////
router.put("/updateState/:npcId/:userId", controller.updateDialogueState)

module.exports = router;