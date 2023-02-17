/// ///////////////////////////////////////////////////
// INCLUDES
/// ///////////////////////////////////////////////////
const game = require('../model/gamesModel.js'); 

/// ///////////////////////////////////////////////////
// Export handling of request of GET game by id
/// //////////////////////////////////////////////////
module.exports.getGame = (req, res, next) => {
    // Get params id 
    const {gameId} = req.params

    game.getGame(gameId)
    // Success
    .then((result) => {
        res.status(200).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(404).send(`Failed to get game by id: ${  gameId}`)
    })
}