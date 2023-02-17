/// ///////////////////////////////////////////////////
// INCLUDES
/// ///////////////////////////////////////////////////
const pool  = require('../db');

/// ///////////////////////////////////////////////////
// Export get floorid function
/// ///////////////////////////////////////////////////
module.exports.getFloor = async (floorId) => {
    // sql statement 
    const sql = `SELECT f.floorid, f.floorname, f.imageid, i.imageurl 
                FROM floors f 
                INNER JOIN image i ON f.imageid = i.imageid 
                WHERE f.floorid = $1`

    const result = await pool.query(sql, [floorId])

    // throws error for empty floor id GET request
    if (result.rows.length === 0) {
        throw new Error(`No floorid exist`)
    }
    // return query result
    return result.rows[0]
}

/// ///////////////////////////////////////////////////
// Export get floorid function
/// ///////////////////////////////////////////////////
module.exports.getFloorByName = async (floorName) => {
    // sql statement 
    const sql = `SELECT f.floorid, f.floorname, f.imageid, i.imageurl 
                FROM floors f 
                INNER JOIN image i ON f.imageid = i.imageid 
                WHERE f.floorname LIKE $1 ORDER BY f.floorid ASC`

    const result = await pool.query(sql, [`%${floorName}%`]);

    // throws error for empty floor id GET request
    if (result.rows.length === 0) {
        throw new Error(`No floor name exist`)
    }
    // return query result
    return result.rows
}

/// ///////////////////////////////////////////////////
// Export get floors function
/// ///////////////////////////////////////////////////
module.exports.getFloors = async () => {
    // sql statement 
    const sql = `SELECT f.floorid, f.floorname, f.imageid, i.imageurl 
                FROM floors f 
                INNER JOIN image i ON f.imageid = i.imageid ORDER BY f.floorid ASC`

    const result = await pool.query(sql, [])

    // throws error for empty floor data in floor entity
    if (result.rows.length === 0) {
        throw new Error(`No floors exist`)
    }
    // return query result
    return result.rows
}

/// ///////////////////////////////////////////////////
// Export insert floors function
/// ///////////////////////////////////////////////////
module.exports.insertFloor = async (floorName, imageId) => {
    // sql statement 
    const sql = 'INSERT into floors (floorname, imageid) VALUES ($1, $2) RETURNING *'

    const result = await pool.query(sql, [floorName, imageId])

    // throws error for params that are not a number
    if (isNaN(imageId)) {
        throw new Error(`Key in a valid number`)
    }
    // return query result
    return result.rows
}

/// ///////////////////////////////////////////////////
// Export update floor's imageid by floorid function
/// ///////////////////////////////////////////////////
module.exports.updateFloor = async (imageId, floorName, floorId) => {
    // sql statement 
    const sql = `UPDATE floors 
    SET imageid = COALESCE($1, subquery.imageid), 
        floorname = COALESCE($2, subquery.floorname) 
    FROM (SELECT floorname, imageid FROM floors WHERE floorid = $3) AS subquery
    WHERE floorid = $3 RETURNING *`

    const result = await pool.query(sql, [imageId, floorName, floorId])

    // throws error for params that are not a number
    if (isNaN(imageId) && isNaN(floorId)) {
        throw new Error(`Key in a number`)
    }

    // throws error for empty floor data in floor entity
    if (result.rowCount === 0) {
        throw new Error(`Key in an existing floorid number`)
    }
    // return query result
    return result
}

/// ///////////////////////////////////////////////////
// Export delete floor by id function
/// ///////////////////////////////////////////////////
module.exports.deleteFloor = async (floorId) => {
    // sql statement 
    const sql = 'DELETE FROM floors WHERE floorid = $1'

    const result = await pool.query(sql, [floorId])

    // throws error for params that are not a number
    if (isNaN(floorId)) {
        throw new Error(`Key in a number`)
    }

    // throws error for empty floor data in floor entity
    if (result.rowCount === 0) {
        throw new Error(`Key in an existing floorid number`)
    }
    // return query result
    return result
}