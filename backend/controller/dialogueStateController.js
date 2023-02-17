const dialogueStateModel = require('../model/dialogueStateModel');

/// ///////////////////////////////////////////////////
// Controller to insert a new dialogueState
/// ///////////////////////////////////////////////////
module.exports.insertDialogueState = (req, res, next) => {
    // Get params 
    const {npcId} = req.body;
    const {dialogueID} = req.body;
    const {userId} = req.body;
    const {plotId} = req.body;
    const {stateId} = req.body;
    const {rewardItemId} = req.body;


    dialogueStateModel.insertDialogueStateModel(npcId, dialogueID, userId, plotId, stateId, rewardItemId)
    // Success
    .then((result) => {
        res.status(201).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(400).send('Failed to insert dialogue state!')
    });
}

/// ///////////////////////////////////////////////////
// Controller to update the state ID of a dialogue
/// ///////////////////////////////////////////////////
module.exports.updateDialogueState = (req, res, next) => {
    const {stateId} = req.body;
    const {npcId} = req.params;
    const {userId} = req.params;
    
    dialogueStateModel.updateDialogueStateModel(stateId, npcId, userId)

    // Success
    .then((result) => {
        res.send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(404).json({message:'Dialogue not found!'});
    });
}
