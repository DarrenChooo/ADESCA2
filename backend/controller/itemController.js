const item = require('../model/itemModel.js');

/// ///////////////////////////////////////////////////
// Export handling of request for create Item
/// //////////////////////////////////////////////////
module.exports.createItems = (req, res, next) => {

    const {itemname} = req.body;
    const {cost} = req.body;
    const {levelreq} = req.body;
    const {imageid} = req.body;
    const {critrate} = req.body;
    const {durability} = req.body;
    const {damage} = req.body;
    const {speed} = req.body;

    item.createItems(itemname, cost, levelreq, imageid, critrate, durability, damage, speed)
        .then((result) => {
            console.log(result)
            res.status(201).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ Error: err.message })
        })
};

/// ///////////////////////////////////////////////////
// Export handling of request for retrieving all Items
/// //////////////////////////////////////////////////
module.exports.getAllItems = (req, res, next) => {

    item.getAllItems()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ Error: err.message })
        })
};

/// ///////////////////////////////////////////////////
// Export handling of request for retrieving Store Items
/// //////////////////////////////////////////////////
module.exports.getStoreItems = (req, res, next) => {

    const {floorid} = req.params

    item.getStoreItems(floorid)
        .then((result) => {
            res.status(200).json(result.rows);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ Error: err.message })
        })
};

/// ///////////////////////////////////////////////////
// Export handling of request for retrieve Item by ID
/// //////////////////////////////////////////////////
module.exports.getItems = (req, res, next) => {

    const itemid = req.params.id

    item.getItems(itemid)
        .then((result) => {
            if (result.rowCount == 0) {
                res.status(404).json({ Error: `Item ${itemid} not found` })
            } else {
                res.json(result.rows[0]);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ Error: err.message })
        })
};

/// ///////////////////////////////////////////////////
// Export handling of request for retrieve Item by search
/// //////////////////////////////////////////////////
module.exports.getItemsByName = (req, res, next) => {

    const {itemname} = req.params

    item.getItemsByName(itemname)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ Error: err.message })
        })
};

/// ///////////////////////////////////////////////////
// Export handling of request for update Item
/// //////////////////////////////////////////////////
module.exports.updateItems = (req, res, next) => {

    const itemid = req.params.id;
    const {itemname} = req.body;
    const {cost} = req.body;
    const {levelreq} = req.body;
    const {imageid} = req.body;
    const {critrate} = req.body;
    const {durability} = req.body;
    const {damage} = req.body;
    const {speed} = req.body;

    item.updateItems(itemid, itemname, cost, levelreq, imageid, critrate, durability, damage, speed)
        .then(() => {
            res.status(200).json({ message: `item ${itemid} has been updated successfully` });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ Error: err.message })
        })
};

/// ///////////////////////////////////////////////////
// Export handling of request for delete Item
/// //////////////////////////////////////////////////
module.exports.deleteItems = (req, res, next) => {

    const itemid = req.params.id

    item.deleteItems(itemid)
        .then((result) => {
            if (result.rowCount == 0) {
                res.status(404).json({ Error: `Item ${itemid} not found` })
            } else {
                res.status(200).json({ message: `item ${itemid} has been deleted successfully` });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ Error: err.message })
        })
};

/// ///////////////////////////////////////////////////
// Export handling of request for retrieving equipped item data
/// //////////////////////////////////////////////////
module.exports.retrieveEquippedItemData = (req, res, next) => {

    item.retrieveEquippedItemData()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ Error: err.message })
        })
};