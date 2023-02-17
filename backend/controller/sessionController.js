/// ///////////////////////////////////////////////////
// INCLUDES
/// ///////////////////////////////////////////////////
const session = require('../model/sessionModel.js'); 

/// ///////////////////////////////////////////////////
// Export handling of request of GET Session id
/// //////////////////////////////////////////////////
module.exports.getSession = (req, res, next) => {
    // Get params id 
    const {sessionId} = req.params

    session.getSession(sessionId)
    // Success
    .then((result) => {
        res.status(200).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(404).send(`Failed to get floor by id: ${  sessionId}`)
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of inserting new session
/// //////////////////////////////////////////////////
module.exports.insertSession = (req, res, next) => {
    // Get body 
    const {player1Id} = req.body
    const {player2Id} = req.body

    session.insertSession(player1Id, player2Id)
    // Success
    .then((result) => {
        res.status(201).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(400).send('Failed to insert new session')
    })
}

