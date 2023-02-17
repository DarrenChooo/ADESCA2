/// ///////////////////////////////////////////////////
// INCLUDES
/// ///////////////////////////////////////////////////
const pool = require('../db');

/// ///////////////////////////////////////////////////
// Insert user's dialogue session state
/// ///////////////////////////////////////////////////
module.exports.insertDialogueStateModel = async (npcId, dialogueID, userId, plotId, stateId, rewardItemId) => {
    // sql statement
    const sql = `
    INSERT into dialogueState (npcId, dialogueID, userId, plotId, stateId, rewardItemId) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    ON CONFLICT (userId, npcId) 
    DO UPDATE 
    SET stateId = 1
    `;

    const result = await pool.query(sql, [npcId, dialogueID, userId, plotId, stateId, rewardItemId])

    // throws error if npcId is invalid
    if (isNaN(npcId) || isNaN(dialogueID) || isNaN(userId) || isNaN(plotId) || isNaN(stateId)) {
        throw new Error(`Invalid npcId! Please key in a valid one.`);
    }
    
    // return the returned result from the query
    return result.rows
};

/// ///////////////////////////////////////////////////
// Get all dialogueState data
/// ///////////////////////////////////////////////////
module.exports.getAllDialogueModel = async () => {
    // sql statement 
    const sql = 'SELECT * FROM dialogueState'

    const result = await pool.query(sql, [])

    // throws error if there are no npc found in the database
    if (result.rows.length === 0) {
        throw new Error(`No dialogue exists`)
    }

    // return the returned result from the query
    return result.rows
}

/// ///////////////////////////////////////////////////
// Update dialogueState data
/// ///////////////////////////////////////////////////
module.exports.updateDialogueStateModel = async (stateId, npcId, userId) => {
    // sql statement 
    const sql = `
    UPDATE dialogueState 
    SET stateId = $1
    WHERE npcId = $2 AND userId = $3
    RETURNING *
    `

    const result = await pool.query(sql, [stateId, npcId, userId])

    // throws error if dialogue is invalid
    if (isNaN(npcId) || isNaN(userId) || isNaN(stateId)) {
        throw new Error(`Dialogue Id entered is not a number! Please enter a number.`)
    }

    // return the returned result from the query
    return result
}
