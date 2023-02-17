/// ///////////////////////////////////////////////////
// INCLUDES
/// ///////////////////////////////////////////////////
const floor = require('../model/floorsModel.js'); 

/// ///////////////////////////////////////////////////
// Export handling of request of GET floor id
/// //////////////////////////////////////////////////
module.exports.getFloor = (req, res, next) => {
    // Get params id 
    const {floorId} = req.params

    floor.getFloor(floorId)
    // Success
    .then((result) => {
        res.status(200).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(404).send(`Failed to get floor by id: ${  floorId}`)
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of GET floor id
/// //////////////////////////////////////////////////
module.exports.getFloorByName = (req, res, next) => {
    // Get params id 
    const {floorName} = req.params

    floor.getFloorByName(floorName)
    // Success
    .then((result) => {
        res.status(200).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(404).send(`Failed to get floor by name: ${  floorName}`);
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of GET all floors
/// //////////////////////////////////////////////////
module.exports.getAllFloors = (req, res, next) => {

    floor.getFloors()
    // Success
    .then((result) => {
        res.status(200).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(404).send('Failed to get all floors')
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of insert floor with imageId
/// //////////////////////////////////////////////////
module.exports.insertFloor = (req, res, next) => {
    // Get body 
    const {imageId} = req.body
    const {floorName} = req.body

    floor.insertFloor(floorName, imageId)
    // Success
    .then((result) => {
        res.status(201).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(400).send('Failed to insert new floor')
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of delete floor with floorId
/// //////////////////////////////////////////////////
module.exports.updateFloor = (req, res, next) => {
    // Get params floorId and JSON body
    const {floorId} = req.params
    const {imageId} = req.body
    const {floorName} = req.body

    floor.updateFloor(imageId, floorName, floorId)
    // Success
    .then((result) => {
        const message = `floor:${floorId} has been updated`
        // send JSON object for success with the following fields
        res.status(201).json({message, updatedColumn : result.rows})
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(404).send(`Failed to update floor by id: ${  floorId}`)
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of delete floor with floorId
/// //////////////////////////////////////////////////
module.exports.deleteFloor = (req, res, next) => {
    // Get params imageId 
    const {floorId} = req.params

    floor.deleteFloor(floorId)
    // Success
    .then(() => {
        const message = `floor:${floorId} has been deleted`
        // send JSON object for success with the following fields
        res.status(202).json({message});
    })
    // Error
    .catch((err) => {
        res.status(404).send(err.detail)
    })
}