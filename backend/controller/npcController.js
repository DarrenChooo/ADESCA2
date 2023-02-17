const npcModel = require('../model/npcModel');

/// ///////////////////////////////////////////////////
// Controller to get all NPCs
/// ///////////////////////////////////////////////////
module.exports.getAllNpc = (req, res, next) => {

    npcModel.getAllNpcModel()
        // Success
        .then((result) => {
            if (result.rowCount === 0) {
                res.status(404).json({ message: "NPC not found!" });
            }
            else {
                res.status(200).json(result);
            }

        })
        // Error
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Server Error' })
        });
}

/// ///////////////////////////////////////////////////
// Controller to get NPC by ID
/// ///////////////////////////////////////////////////
module.exports.getNpcById = (req, res, next) => {
    const {npcid} = req.params
    const {userid} = req.params

    npcModel.getNpcByIdModel(npcid, userid)
        // Success
        .then((result) => {
            res.json(result);
        })
        // Error
        .catch((err) => {
            console.error(err);
            if (isNaN(npcid) || isNaN(userid)) {
                res.status(400).json({ message: 'NPC ID entered is not a number' });
            }
            else {
                res.status(500).json({ message: 'Server Error' })
            }
            
        });
}

/// ///////////////////////////////////////////////////
// Controller to insert a new NPC
/// ///////////////////////////////////////////////////
module.exports.insertNpc = (req, res, next) => {
    // Get params 
    const {imageId} = req.body
    const {npcName} = req.body
    const {floorId} = req.body

    npcModel.insertNpcModel(npcName, imageId, floorId)
        // Success
        .then((result) => {
            res.status(201).json(result);
        })
        // Error
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Server Error' })
        });
}

/// ///////////////////////////////////////////////////
// Controller to update a NPC by Id
/// ///////////////////////////////////////////////////
module.exports.updateNpc = (req, res, next) => {
    // Get params floorid and JSON body
    const {npcName} = req.body
    const {imageId} = req.body
    const floorid = req.body.floorId
    const {npcId} = req.params

    npcModel.updateNpcModel(npcName, imageId, floorid, npcId)
        // Success
        .then((result) => {
            const message = `NPC ${npcId} - ${npcName} has been updated`
            // send JSON object of the updated NPC details if successful
            res.status(200).json({ message, updatedColumn: result.rows })
        })

        // Error
        .catch((err) => {
            console.error(err);
            if(isNaN(imageid) || isNaN(floorid) || isNaN(npcId)) {
                res.status(400).json({ message: 'Image, Floor, and NPC IDs must be a number.' });
            }
            else {
                res.status(500).json({ message: 'Failed to update NPC by Id' })
            }
            
        });
}

/// ///////////////////////////////////////////////////
// Controller to delete a NPC by Id
/// ///////////////////////////////////////////////////
module.exports.deleteNpc = (req, res, next) => {
    // Get params imageid 
    const {npcId} = req.params

    npcModel.deleteNpcModel(npcId)
        // Success
        .then(() => {
            const message = `NPC ${npcId} has been deleted!`
            // send JSON object for success with the following fields
            res.status(200).json({ message });

            if(isNaN(npcId)) {
                res.status(400).json({ message: 'NPC ID must be a number.' });
            }
        })
        // Error
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Failed to delete NPC by Id' })
        })
}

/// ///////////////////////////////////////////////////
// Controller to search an NPC
/// ///////////////////////////////////////////////////
module.exports.searchNpc = (req, res, next) => {
    const {searchInp} = req.params;

    npcModel.searchNpcModel(searchInp)

        // Success
        .then((result) => {
            if (result.rowCount === 0) {
                res.status(404).json({ message: "NPC not found!" });
            }
            else {
                res.json(result);
            }

        })
        // Error
        .catch((err) => {
            console.error(err);

            res.status(500).json({ message: "Sever Error" });
        });
}

/// ///////////////////////////////////////////////////
// Controller to get game name via npcid
/// ///////////////////////////////////////////////////
module.exports.getGameByNpcId = (req, res, next) => {
    const {npcid} = req.params;

    npcModel.getGameByNpcIdModel(npcid)

        // Success
        .then((result) => {
            if (result.rowCount === 0) {
                res.status(404).json({ message: "NPC not found!" });
            }
            else {
                res.json(result.rows);
            }

        })
        // Error
        .catch((err) => {
            console.error(err);

            res.status(500).json({ message: "Sever Error" });
        });
}