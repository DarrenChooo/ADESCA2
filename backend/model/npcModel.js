const pool = require('../db');

/// ///////////////////////////////////////////////////
// Model to get all NPCs
/// ///////////////////////////////////////////////////
module.exports.getAllNpcModel = async () => {
    // sql statement 
    const sql = `
    SELECT n.npcid, n.npcname, n.imageid, n.floorid, i.imageurl 
    FROM npc n 
    INNER JOIN image i ON n.imageid = i.imageid ORDER BY n.npcid ASC
    `;

    const result = await pool.query(sql, [])

    // throws error if there are no npc found in the database
    if (result.rows.length === 0) {
        throw new Error(`No npc exists`)
    }

    // return the returned result from the query
    return result.rows
}

/// ///////////////////////////////////////////////////
// Model to get NPC by ID
/// ///////////////////////////////////////////////////
module.exports.getNpcByIdModel = async (npcId, userId) => {
    const sql = `
    SELECT n.npcid, n.npcname, n.imageid, n.floorid, n.rewarditemid, i.imageurl, COALESCE((SELECT stateid FROM dialogueState WHERE npcid = $1 AND userid = $2), 0) AS "stateid" 
    FROM npc n
    INNER JOIN image i ON n.imageid = i.imageid 
    WHERE n.npcid = $1
    `;

    const result = await pool.query(sql, [npcId, userId])

    // throws error if npcId is invalid
    if (result.rows.length === 0) {
        throw new Error(`NPC No. ${npcId} not found!`)
    }
    // return the returned result from the query
    return result.rows
};

/// ///////////////////////////////////////////////////
// Model to add a new NPC
/// ///////////////////////////////////////////////////
module.exports.insertNpcModel = async (npcName, imageId, floorId) => {
    // sql statement
    const sql = `INSERT into npc (npcName, imageId, floorId) VALUES ($1, $2, $3) RETURNING *`;
    const result = await pool.query(sql, [npcName, imageId, floorId])

    // throws error if imageId is invalid
    if (isNaN(imageId)) {
        throw new Error(`Invalid imageId! Pls key in a valid one.`);
    }
    // return the returned result from the query
    return result.rows
};

/// ///////////////////////////////////////////////////
// Model to update a NPC by Id
/// ///////////////////////////////////////////////////
module.exports.updateNpcModel = async (npcName, imageId, floorid, npcId) => {
    // sql statement 
    const sql = `
    UPDATE npc 
    SET npcname = $1, 
        imageid = $2, 
        floorid = $3
    WHERE npcid = $4 
    RETURNING *`

    const result = await pool.query(sql, [npcName, imageId, floorid, npcId])

    // throws error if npcId is invalid
    if (isNaN(npcId)) {
        throw new Error(`NPC Id entered is not a number! Please enter a number.`)
    }

    // return the returned result from the query
    return result
}

/// ///////////////////////////////////////////////////
// Model to delete a NPC by Id
/// ///////////////////////////////////////////////////
module.exports.deleteNpcModel = async (npcId) => {
    // sql statement 
    const sql = 'DELETE FROM npc WHERE npcId = $1'

    const result = await pool.query(sql, [npcId])

    // throws error if npcId entered is not a number
    if (isNaN(npcId)) {
        throw new Error(`NPC Id entered is not a number! Please enter a number.`)
    }

    // throws error if npcid is invalid
    if (result.rowCount === 0) {
        throw new Error(`NPC No. ${npcId} doesn't exist!`)
    }
    // return the returned result from the query
    return result
}

/// ///////////////////////////////////////////////////
// Model to search npc
/// ///////////////////////////////////////////////////
module.exports.searchNpcModel = async (searchInp) => {
    // sql statement 
    const sql = `


    SELECT n.npcid, n.npcname, n.imageid, n.floorid, i.imageurl 
    FROM npc n 
    INNER JOIN image i ON n.imageid = i.imageid 
    WHERE n.npcname ILIKE $1
    `;

    const result = await pool.query(sql, [`%${  searchInp  }%`]);

    // throws error if npcid is invalid
    if (result.rowCount === 0) {
        throw new Error(`NPC doesn't exist!`)
    }

    // return the returned result from the query
    return result
}

/// ///////////////////////////////////////////////////
// Model to get game name via npcid
/// ///////////////////////////////////////////////////
module.exports.getGameByNpcIdModel = async (npcid) => {
    // sql statement 
    const sql = `
    SELECT n.npcid, n.npcname, n.floorid, g.gameid, g.gamename
    FROM npc n 
    INNER JOIN game g ON n.npcid = g.npcid 
    WHERE n.npcid = $1
    `;

    const result = await pool.query(sql, [npcid]);

    // throws error if npcid is invalid
    if (result.rowCount === 0) {
        throw new Error(`NPC doesn't exist!`)
    }

    // return the returned result from the query
    return result
}