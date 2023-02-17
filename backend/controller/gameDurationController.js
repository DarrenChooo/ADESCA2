const gameDurationModel = require('../model/gameDurationModel');

/// ///////////////////////////////////////////////////////////////
// Controller to get the number of rows according to time range
/// ///////////////////////////////////////////////////////////////
module.exports.getGameDuration = (req, res, next) => {
    // Get params 
    // const timerangestart = req.params.timerangestart
    // const timerangeend = req.params.timerangeend

    gameDurationModel.getGameDurationModel()

        // Success
        .then((result) => {
            res.status(200).json(result);

        })
        // Error
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Server Error' })
        });
}

/// ///////////////////////////////////////////////////////////////
// Controller to get the number of rows by id
/// ///////////////////////////////////////////////////////////////
module.exports.getGameDurationById = (req, res, next) => {
    // Get params 
    const {gameId} = req.params
    const {userId} = req.params

    gameDurationModel.getGameDurationByIdModel(gameId, userId)

        // Success
        .then((result) => {
            res.status(200).json(result);
            
        })
        // Error
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Server Error' })
        });
}

/// ///////////////////////////////////////////////////////////////
// Controller to create a data row for game duration after dialogue interaction
/// ///////////////////////////////////////////////////////////////
module.exports.insertGameDuration = (req, res, next) => {
    // Get params 
    const {gameId} = req.body;
    const {timestart} = req.body;
    const {timeend} = req.body;
    const {duration} = req.body;
    const {userid} = req.body;
    const {attempt} = req.body;

    gameDurationModel.insertGameDurationModel(gameId, timestart, timeend, duration, userid, attempt)
        // Success
        .then((result) => {
            res.status(201).send(result);
        })
        // Error
        .catch((err) => {
            console.error(err);
            res.status(400).send('Failed to insert game duration!')
        });
}

/// ///////////////////////////////////////////////////////////////
// Controller to update the game duration after completion of game
/// ///////////////////////////////////////////////////////////////
module.exports.updateDuration = (req, res, next) => {
    // Get params floorid and JSON body
    const {timeend} = req.body
    const {duration} = req.body
    const {gameid} = req.body
    const {attempt} = req.body
    const {userid} = req.body

    gameDurationModel.updateDurationModel(timeend, duration, gameid, attempt, userid)
        // Success
        .then((result) => {
            const message = `Game duration has been updated`
            // send JSON object of the updated NPC details if successful
            res.status(200).json({ message })
        })

        // Error
        .catch((err) => {
            console.error(err);
            if (isNaN(duration, gameid, attempt, userid)) {
                res.status(400).json({ message: 'Duration, Game ID, Attempt and User ID must be a number.' });
            }
            else {
                res.status(500).json({ message: 'Failed to update game duration details' })
            }

        });
}