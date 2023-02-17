/// ///////////////////////////////////////////////////
// INCLUDES
/// ///////////////////////////////////////////////////
const pool  = require('../db');

/// ///////////////////////////////////////////////////
// Export get session by id function
/// ///////////////////////////////////////////////////
module.exports.getSession = async (sessionId) => {
    // sql statement 
    const sql = `SELECT * 
                FROM session 
                WHERE sessionid = $1`

    const result = await pool.query(sql, [sessionId])

    // throws error for empty floor id GET request
    if (result.rows.length === 0) {
        throw new Error(`No sessionId exist`)
    }
    // return query result
    return result.rows[0]
}

/// ///////////////////////////////////////////////////
// Export insert session function
/// ///////////////////////////////////////////////////
module.exports.insertSession = async (player1id, player2id) => {
    // sql statement 
    const sql = 'INSERT into session (player1id, player2id) VALUES ($1, $2) RETURNING *'

    const result = await pool.query(sql, [player1id, player2id])

    // throws error for params that are not a number
    if (isNaN(player1id) && isNaN(player2id)) {
        throw new Error(`Key in a valid number`)
    }
    // return query result
    return result.rows
}
