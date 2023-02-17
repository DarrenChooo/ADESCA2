/// ///////////////////////////////////////////////////
// INCLUDES
/// ///////////////////////////////////////////////////
const inventory = require('../model/inventoryModel.js'); 

/// ///////////////////////////////////////////////////
// Export handling of request of GET all inventory 
/// //////////////////////////////////////////////////
module.exports.getAllInventory = (req, res, next) => {
    // Function to get all inventory
    inventory.getAllInventoryM()
    // Success
    .then((result) => {
        res.status(200).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(500).send('Failed to get all inventory')
    })
}


/// ///////////////////////////////////////////////////
// Export handling of request of GET inventory id
/// //////////////////////////////////////////////////
module.exports.getInventoryId = (req, res, next) => {
    // Get params id 
    const {userid} = req.params

    // Function to get inventory by userid
    inventory.getInventoryByIdM(userid)
    // Success
    .then((result) => {
        res.status(200).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(500).send('Failed to get inventory by user id')
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of GET item id
/// //////////////////////////////////////////////////
module.exports.getInventoryItemId = (req, res, next) => {
    // Get params ids 
    const {userid} = req.params
    const {itemid} = req.params

    // Function to get inventory by userid
    inventory.getInventoryByItemIdM(userid, itemid)
    // Success
    .then((result) => {
        res.status(200).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(500).send('Failed to get inventory by user id')
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of POST inventory
/// //////////////////////////////////////////////////
module.exports.buyItem = (req, res, next) => {
    // Get body ids
    const {userid} = req.body
    const {itemid} = req.body
    const {quantity} = req.body

    // Function to buy item
    inventory.insertInventoryM(userid,itemid,quantity)
    // Success
    .then((result) => {
        res.status(201).send(result.rows);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(500).send('Failed to get buy item')
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of DELETE inventory
/// //////////////////////////////////////////////////
module.exports.updateDeleteItem = (req, res, next) => {
    // Get body id 
    const {userid} = req.params
    const {itemid} = req.params
    const {quantity} = req.body
    // Function to delete/update item
    inventory.updateDeleteInventoryM(userid,itemid,quantity)
    // Success
    .then((result) => {
        res.status(200).send(result.rows);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(500).send('Failed to get delete item')
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request for retrieve Inventory by search username
/// //////////////////////////////////////////////////
module.exports.getInventoryByUserName = (req, res, next) => {

    const {username} = req.params

    inventory.getInventoryByUserNameM(username)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        
        console.error(err);
        res.status(500).json({Error: `error`})
    })
};
