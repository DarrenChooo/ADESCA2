/// ///////////////////////////////////////////////////
// INCLUDES
/// ///////////////////////////////////////////////////
const pool = require('../db');

/// ///////////////////////////////////////////////////
// Export get rows according to duration function
/// ///////////////////////////////////////////////////
module.exports.getGameDurationModel = async () => {
    const sql = `
    SELECT * FROM gameplayduration
    `;

    const result = await pool.query(sql, [])

    // return the returned result from the query
    return result.rows
};

/// ///////////////////////////////////////////////////
// Export get rows of game duration by id function
/// ///////////////////////////////////////////////////
module.exports.getGameDurationByIdModel = async (gameId, userId) => {
    const sql = `
    SELECT * FROM gameplayduration where gameid = $1 and userid = $2
    ORDER BY attempt DESC
    `;

    const result = await pool.query(sql, [gameId, userId])

    // return the returned result from the query
    return result.rows
};

/// ///////////////////////////////////////////////////
// Export add duration function
/// ///////////////////////////////////////////////////
module.exports.insertGameDurationModel = async (gameId, timestart, timeend, duration, userid, attempt) => {
    // sql statement
    const sql = `
    INSERT into gameplayduration (gameId, timestart, timeend, duration, userid, attempt) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *
    `;

    const result = await pool.query(sql, [gameId, timestart, timeend, duration, userid, attempt])

    // throws error if npcId is invalid
    if (isNaN(gameId)) {
        throw new Error(`Invalid gameId! Please key in a valid one.`);
    }
    
    // return the returned result from the query
    return result.rows
};

/// ///////////////////////////////////////////////////
// Export update duration function
/// ///////////////////////////////////////////////////
module.exports.updateDurationModel = async (timeend, duration, gameid, attempt, userid) => {
    // sql statement 
    const sql = `
    UPDATE gameplayduration 
    SET timeend = $1,
	duration = $2
    WHERE gameid = $3
	AND attempt = $4
	AND userid = $5
    RETURNING *
    `

    const result = await pool.query(sql, [timeend, duration, gameid, attempt, userid])

    // throws error if npcId is invalid
    if (isNaN(duration, gameid, attempt, userid)) {
        throw new Error(`The Duration, Game ID, Attempt or User ID entered is not a number!`)
    }

    // return the returned result from the query
    return result
}