/// ///////////////////////////////////////////////////
// INCLUDES
/// ///////////////////////////////////////////////////
const pool  = require('../db');

/// ///////////////////////////////////////////////////
// Export get game by id function
/// ///////////////////////////////////////////////////
module.exports.getGame = async (gameId) => {
    // sql statement 
    const sql = `SELECT g.gameid, g.gamename, g.npcid
                FROM game g 
                WHERE g.npcid = $1`

    const result = await pool.query(sql, [gameId])

    // throws error for empty floor id GET request
    if (result.rows.length === 0) {
        throw new Error(`No gameid exist`)
    }
    // return query result
    return result.rows[0]
}