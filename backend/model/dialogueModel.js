const pool = require('../db');

/// ///////////////////////////////////////////////////
// Model to add a new dialogue
/// ///////////////////////////////////////////////////
module.exports.insertDialogueModel = async (dialogueDesc, npcId, plotId, stateId) => {
    // sql statement
    const sql = `INSERT into dialogue (dialogueDesc, npcId, plotId, stateId) VALUES ($1, $2, $3, $4) RETURNING *`;
    const result = await pool.query(sql, [dialogueDesc, npcId, plotId, stateId])

    // throws error if npcId is invalid
    if (isNaN(npcId)) {
        throw new Error(`Invalid npcId! Please key in a valid one.`);
    }
    // return the returned result from the query
    return result.rows
};

/// ///////////////////////////////////////////////////
// Model to update a dialogue by Id
/// ///////////////////////////////////////////////////
module.exports.updateDialogueModel = async (dialogueDesc, npcId, plotId, stateId, dialogueId) => {
    // sql statement 
    const sql = `
    UPDATE dialogue 
    SET dialogueDesc = $1, 
        npcId = $2, 
        plotId = $3, 
        stateId = $4
    WHERE dialogueId = $5
    RETURNING *`

    const result = await pool.query(sql, [dialogueDesc, npcId, plotId, stateId, dialogueId])

    // throws error if npcId is invalid
    if (isNaN(dialogueId)) {
        throw new Error(`Dialogue Id entered is not a number! Please enter a number.`)
    }

    // return the returned result from the query
    return result
}

/// ///////////////////////////////////////////////////
// Model to delete a dialogue by Id
/// ///////////////////////////////////////////////////
module.exports.deleteDialogueModel = async (dialogueId) => {
    // sql statement 
    const sql = 'DELETE FROM dialogue WHERE dialogueId = $1'

    const result = await pool.query(sql, [dialogueId])

    // throws error if npcId entered is not a number
    if (isNaN(dialogueId)) {
        throw new Error(`Dialogue Id entered is not a number! Please enter a number.`)
    }

    // throws error if npcid is invalid
    if (result.rowCount === 0) {
        throw new Error(`NPC No. ${dialogueId} doesn't exist!`)
    }
    // return the returned result from the query
    return result
}

/// ///////////////////////////////////////////////////
// Model to get all dialogue
/// ///////////////////////////////////////////////////
module.exports.getAllDialogueModel = async () => {
    // sql statement 
    const sql = 'SELECT * FROM dialogue'

    const result = await pool.query(sql, [])

    // throws error if there are no npc found in the database
    if (result.rows.length === 0) {
        throw new Error(`No dialogue exists`)
    }

    // return the returned result from the query
    return result.rows
}

/// ///////////////////////////////////////////////////
// Model to get dialogue by ID
/// ///////////////////////////////////////////////////
module.exports.getDialogueByIdModel = async (dialogueId) => {
    const sql = 'SELECT * FROM dialogue WHERE dialogueId = $1'

    const result = await pool.query(sql, [dialogueId])

    // throws error if npcId is invalid
    if (result.rows.length === 0) {
        throw new Error(`Dialogue No. ${dialogueId} not found!`)
    }
    // return the returned result from the query
    return result.rows
};

/// ///////////////////////////////////////////////////
// Model to get dialogue by sections
/// ///////////////////////////////////////////////////
module.exports.getDialogueIntroModel = async (dialogueRowsToGet) => {
    const sql = `SELECT dialogueDesc FROM dialogue LIMIT $1`

    const result = await pool.query(sql, dialogueRowsToGet)

    // throws error if npcId is invalid
    if (result.rows.length === 0) {
        throw new Error(`Couldn't get dialogue`);
    }
    // return the returned result from the query
    return result.rows
};

/// ///////////////////////////////////////////////////
// Model to get dialogue by ID, stateid = 0, and plotid
/// ///////////////////////////////////////////////////
module.exports.getFilteredDialogueModel = async (npcId, plotId) => {
    const sql = `
    SELECT * FROM dialogue 
    WHERE npcid = $1 AND stateid = 0 AND plotid = $2 
    ORDER BY dialogueId ASC;
    `;

    const result = await pool.query(sql, [npcId, plotId])

    // throws error if npcId is invalid
    if (result.rows.length === 0) {
        throw new Error(`Dialogue No. ${npcId, plotId} not found!`)
    }
    // return the returned result from the query
    return result.rows
};

/// ///////////////////////////////////////////////////
// Model to update the state ID of a dialogue
/// ///////////////////////////////////////////////////
module.exports.updateDialogueStateModel = async (dialogueId) => {
    // sql statement 
    const sql = `
    UPDATE dialogue 
    SET stateId = 0
    WHERE dialogueId = $1
    RETURNING *`

    const result = await pool.query(sql, [dialogueId])

    // throws error if dialogue is invalid
    if (isNaN(dialogueId)) {
        throw new Error(`Dialogue Id entered is not a number! Please enter a number.`)
    }

    // return the returned result from the query
    return result
}

/// ///////////////////////////////////////////////////
// Model to search dialogue
/// ///////////////////////////////////////////////////
module.exports.searchDialogueModel = async (searchInp) => {
    // sql statement 
    const sql = `
    SELECT * FROM dialogue WHERE dialoguedesc ILIKE $1
    `;

    const result = await pool.query(sql, [`%${  searchInp  }%`]);

    // throws error if dialogue is invalid
    if (result.rowCount === 0) {
        throw new Error(`Dialogue doesn't exist!`)
    }

    // return the returned result from the query
    return result
}

/// ///////////////////////////////////////////////////
// Model to get all dialogues via pagination
/// ///////////////////////////////////////////////////
module.exports.getAllDialoguesPaginationModel = async (pagination) => {
    // sql statement 
    const sql = `SELECT * FROM dialogue ORDER BY dialogueid ASC LIMIT 10 OFFSET $1`

    const result = await pool.query(sql, [(pagination - 1) * 10])

    // return query result
    return result.rows;
};

/// ///////////////////////////////////////////////////
// Model to count the number of dialogues in the database
/// ///////////////////////////////////////////////////
module.exports.countDialoguesModel = async () => {
    // sql statement 
    const sql = `SELECT COUNT(dialogueid) FROM dialogue`

    const result = await pool.query(sql)

    // return query result
    return result.rows;
};