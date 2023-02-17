const dialogueModel = require('../model/dialogueModel'); 

/// ///////////////////////////////////////////////////
// Controller to insert a new dialogue
/// ///////////////////////////////////////////////////
module.exports.insertDialogue = (req, res, next) => {
    // Get params 
    const {npcId} = req.params
    const {dialogueDesc} = req.body
    const {plotId} = req.body;
    const {stateId} = req.body;

    dialogueModel.insertDialogueModel(dialogueDesc, npcId, plotId, stateId)
    // Success
    .then((result) => {
        res.status(201).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(400).send('Failed to insert dialogue!')
    });
}

/// ///////////////////////////////////////////////////
// Controller to update a dialogue by Id
/// ///////////////////////////////////////////////////
module.exports.updateDialogue = (req, res, next) => {
    // Get params floorid and JSON body
    const {dialogueDesc} = req.body
    const {npcId} = req.body
    const {plotId} = req.body;
    const {stateId} = req.body;
    const {dialogueId} = req.params

    dialogueModel.updateDialogueModel(dialogueDesc, npcId, plotId, stateId, dialogueId)
    // Success
    .then((result) => {
        const message = `Dialogue ${dialogueId} has been updated`
        // send JSON object of the updated NPC details if successful
        res.status(200).json({message, updatedColumn : result.rows})
    })

    // Error
    .catch((err) => {
        console.error(err);
        res.status(400).send('Failed to update dialogue by Id')
    });
}

/// ///////////////////////////////////////////////////
// Controller to delete a dialogue by Id
/// ///////////////////////////////////////////////////
module.exports.deleteDialogue = (req, res, next) => {
    // Get params imageid 
    const {dialogueId} = req.params

    dialogueModel.deleteDialogueModel(dialogueId)
    // Success
    .then(() => {
        const message = `Dialogue ${dialogueId} has been deleted!`
        // send JSON object for success with the following fields
        res.status(200).json({message});
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(404).json({message:'Dialogue ID not found!'})
    })
}

/// ///////////////////////////////////////////////////
// Controller to get all dialogue
/// ///////////////////////////////////////////////////
module.exports.getAllDialogue = (req, res, next) => {

    dialogueModel.getAllDialogueModel()
    // Success
    .then((result) => {
        res.status(200).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(404).json({message:'Dialogue not found'});
    });
}

/// ///////////////////////////////////////////////////
// Controller to get dialogue by ID
/// ///////////////////////////////////////////////////
module.exports.getDialogueById = (req, res, next) => {
    const {dialogueId} = req.params

    dialogueModel.getDialogueByIdModel(dialogueId)
    // Success
    .then((result) => {
        res.send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(400).json({message:'Failed to get dialogue by ID'})
    });
}

/// ///////////////////////////////////////////////////
// Controller to get dialogue by sections
/// ///////////////////////////////////////////////////
module.exports.getDialogueIntro = (req, res, next) => {
    const {dialogueRowsToGet} = req.params

    dialogueModel.getDialogueIntroModel(dialogueRowsToGet)
    // Success
    .then((result) => {
        res.send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(404).json({message:'Failed to get the rows of dialogues requested!'});
    });
}

/// ///////////////////////////////////////////////////
// Controller to get dialogue by ID, stateid = 0, and plotid
/// ///////////////////////////////////////////////////
module.exports.getFilteredDialogue = (req, res, next) => {
    const {npcId} = req.params;
    const {plotId} = req.params;

    dialogueModel.getFilteredDialogueModel(npcId, plotId)
    // Success
    .then((result) => {
        res.send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(404).json({message: 'Filtered dialogues requested not found!'});
    });
}

/// ///////////////////////////////////////////////////
// Controller to update the state ID of a dialogue
/// ///////////////////////////////////////////////////
module.exports.updateDialogueState = (req, res, next) => {
    const {dialogueId} = req.params;
    
    dialogueModel.updateDialogueStateModel(dialogueId)

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

/// ///////////////////////////////////////////////////
// Controller to search a dialogue
/// ///////////////////////////////////////////////////
module.exports.searchDialogue = (req, res, next) => {
    const {searchInp} = req.params;
    
    dialogueModel.searchDialogueModel(searchInp)

    // Success
    .then((result) => {
        if (result.rowCount === 0) {
            res.status(404).json({message: "Dialogue not found!"});
        }
        else {
            res.send(result);
        }

    })
    // Error
    .catch((err) => {
        console.error(err);

        res.status(500).json({message: "searchNpcModel"});
    });
}

/// ///////////////////////////////////////////////////
// Export handling of request of get all Dialogues in pagination 
/// //////////////////////////////////////////////////
module.exports.getAllDialoguesPagination = (req, res, next) => {

    const {pagination} = req.params

    dialogueModel.getAllDialoguesPaginationModel(pagination)
    .then((result) => {
        console.log(result)
        res.status(200).json(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({Error: err.message})
    })
};

/// ///////////////////////////////////////////////////
// Export handling of request of counting Dialogues
/// //////////////////////////////////////////////////
module.exports.countDialogues = (req, res, next) => {

    dialogueModel.countDialoguesModel()
    .then((result) => {
        console.log(result)
        res.status(200).json(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({Error: err.message})
    })
};