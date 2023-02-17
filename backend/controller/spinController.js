const spin = require('../model/spinModel');

module.exports.getAllRewards = (req, res, next) => {
    spin.getAllRewardsM()
        // Success
        .then((result) => {
            res.status(200).send(result);
        })
        // Error
        .catch((err) => {
            console.error(err);
            res.status(500).send('Failed to get all rewards')
        })
}

module.exports.getRewardsByItemName = (req, res, next) => {
    // Get itemname from request params
    const itemName = req.params.itemname;
    spin.getRewardsByItemNameM(itemName)
        // Success
        .then((result) => {
            res.status(200).send(result);
        })
        // Error
        .catch((err) => {
            console.error(err);
            res.status(500).send('Failed to get all rewards')
        })
}

module.exports.getRewardsByItemId = (req, res, next) => {
    // Get itemname from request params
    const itemId = req.params.itemid;
    spin.getRewardsByItemIdM(itemId)
        // Success
        .then((result) => {
            res.status(200).send(result);
        })
        // Error
        .catch((err) => {
            console.error(err);
            res.status(500).send('Failed to get all rewards')
        })
}

module.exports.getNoInputsMade = (req, res, next) => {
    spin.getNoInputsMadeM()
        // Success
        .then((result) => {
            res.status(200).send(result);
        })
        // Error
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error getting no of inputs made')
        })
}

module.exports.insertSpinWheelItems = (req, res, next) => {
    // Get itemid from request body
    const itemId = req.body.itemid;
   return spin
   .insertSpinWheelItemsM(itemId)
        // Success
        .then((result) => {
            // Itemid inserted
                console.log(`Inserted itemid: ${  itemId}`)
                res.status(201).send(`Inserted itemid: ${  itemId}`)

        })
        // Error
        .catch((err) => {
            // Duplicate itemid
            if (err.code == 23505) {
                console.log(`Duplicate itemid: ${  itemId}`);
                res.status(409).send(`Duplicate itemid: ${  itemId}`)
            }
            // Itemid is not a number
            else if (isNaN(itemId)) {
                console.log(`Item ID: ${  itemId  } is not a number`)
                res.status(400).send(`Item ID: ${  itemId  } is not a number`)
            // Other error
            }
            // cannot have more than 6 rows
            else if (err.code == 23514) {
                console.log('Cannot have more than 6 items in the spin wheel')
                res.status(500).send('Cannot have more than 6 items in the spin wheel')
            }
            else if (err.code == 23503) {
                console.log(`Itemid not found: ${  itemId}`)
                res.status(404).send(`Itemid not found: ${  itemId}`)
            } 
            else {
                console.log(`Failed to insert itemid: ${  itemId}`)
                res.status(500).send(`Failed to insert itemid: ${  itemId}`)
            }
        })
}

module.exports.updateSpinWheelItems = (req, res, next) => {
    // Get params floorid and JSON body
    const itemId = req.body.itemid
    const itemIdParam = req.params.itemid

    spin.updateSpinWheelItemsM(itemId, itemIdParam)
        // Success
        .then((result) => {
            // Itemid not found
            if (result.rowCount == 0) {
                console.log(`Itemid not found: ${  itemId}`)
                res.status(404).send(`Itemid not found: ${  itemId}`)
                // Itemid updated
            } else {
                console.log(`Updated itemid: ${  itemId}`)
                res.status(200).send(`Updated itemid: ${  itemId}`)
            }

        })
        // Error
        .catch((err) => {
            // Itemid not a number
            if (isNaN(itemId)) {
                console.log(`Item ID: ${  itemId  } is not a number`)
                res.status(400).send(`Item ID: ${  itemId  } is not a number`)
                // Itemid not found
            } else if (err.code == 23503) {
                console.log(`Itemid not found: ${  itemId}`)
                res.status(404).send(`Itemid not found: ${  itemId}`)
                // Duplicate itemid
            } else if (err.code == 23505) {
                console.log(`Duplicate itemid: ${  itemId}`);
                res.status(409).send(`Duplicate itemid: ${  itemId}`)
            }
            // Other error
            else {
                console.log(`Failed to update itemid: ${  itemId}`)
                res.status(500).send(`Failed to update itemid: ${  itemId}`)
            }
        })
}


module.exports.deleteAllSpinWheelItems = (req, res, next) => {

    spin.deleteAllSpinWheelItemsM()
        // Success
        .then((result) => {
            console.log('Deleted All Rewards' )
            res.status(200).send(`Deleted All Rewards${ result}` )
        

        })
        // Error
        .catch((err) => {
            console.log('Failed to delete all rewards')
            res.status(500).send(`Failed to delete all rewards${  err}`)
        })
}