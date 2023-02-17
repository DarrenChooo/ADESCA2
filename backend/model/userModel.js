/// ///////////////////////////////////////////////////
// INCLUDES
/// ///////////////////////////////////////////////////
const { Query } = require('pg');
const pool = require('../db');

/// ///////////////////////////////////////////////////
// Export get userid function
/// ///////////////////////////////////////////////////
module.exports.getUser = async (userid) => {
    // sql statement 
    const sql = 'SELECT * FROM users WHERE userid = $1'

    const result = await pool.query(sql, [userid])
    if (result.rows.length === 0) {
        throw new Error(`No such user`)
    }
    // return query result
    console.log(result.rows[0].userid)
    console.log(result.rows[0].username)
    return result.rows[0]
}

/// ///////////////////////////////////////////////////
// Export get userid function with INNER JOIN
/// ///////////////////////////////////////////////////
module.exports.getUserJoinM = async (userid) => {
    // sql statement 
    const sql = `SELECT u.userid, u.role, u.username, u.imageid AS userImageID, u.equippeditem, i.imageurl AS userImageURL, u.floorid, u.gamestatus, 
    f.floorname, f.imageid as floorImageID, c.quantity, it.cost, it.damage, it.speed, it.critrate, it.durability, i2.imageurl
    FROM users u 
    INNER JOIN floors f ON u.floorid = f.floorid 
    INNER JOIN currency c ON c.userid = u.userid
    INNER JOIN image i ON u.imageid = i.imageid
    INNER JOIN items it ON it.itemid = u.equippeditem
    INNER JOIN image i2 ON it.imageid = i2.imageid
    WHERE u.userid = $1`
    const result = await pool.query(sql, [userid])
    if (result.rows.length === 0) {
        throw new Error(`No such user`)
    }
    // return query result
    return result.rows[0]
}

/// ///////////////////////////////////////////////////
// Export get all user function
/// ///////////////////////////////////////////////////
module.exports.getAllUserM = async () => {
    // sql statement
    const sql = 'SELECT * FROM users ORDER BY floorid ASC '
    const result = await pool.query(sql, [])
    if (result.rowCount == 0) {
        throw new Error(`cant get all user`)
    }
    return result.rows;
}

/// ///////////////////////////////////////////////////
// Export delete userid function
/// ///////////////////////////////////////////////////
module.exports.deleteUser = async (userid) => {
    // sql statment
    const sql = 'DELETE FROM users WHERE userid = $1'

    const result = await pool.query(sql, [userid])
    // throws error if userd entered is not a number
    if (isNaN(userid)) {
        throw new Error(`User Id entered is not a number! Please enter a number.`)
    }
    // throws error if userid is invalid
    if (result.rowCount === 0) {
        throw new Error(`User No. ${userid} doesn't exist!`)
    }
    // return result
    return result.rows
}

/// ///////////////////////////////////////////////////
// Export create user function
/// ///////////////////////////////////////////////////
module.exports.createUserM = async (role, username, password) => {
    // sql statement 
    const sql = `INSERT into users (role,username,password,imageid,floorid, plotid, equippeditem) values ($1,$2,$3,27,1, 1, 1) RETURNING *`

    const result = await pool.query(sql, [role, username, password])
    console.log(result)
    return result.rows[0]   
}

/// ///////////////////////////////////////////////////
// Export update user's password function
/// ///////////////////////////////////////////////////
module.exports.updateUserM = async (password, userid) => {

    const sql = `UPDATE users SET password = $1 where userid = $2 RETURNING *`

    const result = await pool.query(sql, [password, userid])
    if (result.rowCount == 0) {
        throw new Error(`user not update`)
    }
    return result;
};

/// ///////////////////////////////////////////////////
// Export update user's password by admin function
/// ///////////////////////////////////////////////////
module.exports.updateUserByAdminM = async (password, userid) => {

    const sql = `UPDATE users SET password = $1 where userid = $2 RETURNING *`

    const result = await pool.query(sql, [password, userid])
    if (result.rowCount == 0) {
        throw new Error(`user not update`)
    }
    return result;
};

/// ///////////////////////////////////////////////////
// Export update user's password function
/// ///////////////////////////////////////////////////
module.exports.updateUserFloor = async (floorId, userId) => {

    const sql = `UPDATE users SET floorid = $1 where userid = $2 RETURNING *`

    const result = await pool.query(sql, [floorId, userId])
    if (result.rowCount == 0) {
        throw new Error(`User:${userId} not update`)
    }
    return result;
};

/// ///////////////////////////////////////////////////
// Export update user's spinwheel lastspin time
/// ///////////////////////////////////////////////////
module.exports.updateLastSpinTimeM= async (lastSpin, userId) => {

    const sql = `UPDATE users SET lastspin = $1 WHERE userid = $2 RETURNING *`

    const result = await pool.query(sql, [lastSpin, userId])
    if (result.rowCount == 0) {
        throw new Error(`User:${userId} not update`)
    }
    return result;
};

/// ///////////////////////////////////////////////////
// Export update user's spinwheel lastspin time
/// ///////////////////////////////////////////////////
module.exports.getLastSpinTimeM= async (userId) => {

    const sql = `SELECT userid, username, lastspin FROM users WHERE userid = $1`

    const result = await pool.query(sql, [userId])
    if (result.rowCount == 0) {
        throw new Error(`User not found`)
    }
    return result;
};



/// ///////////////////////////////////////////////////
// Login function
/// ///////////////////////////////////////////////////
module.exports.loginUserM = async (username, password) => {
    const sql = `SELECT * from users WHERE username = $1 and password = $2 `
    const result = await pool.query(sql, [username, password])
    console.log(username, password)
    if (result.rowCount == 0) {
        throw new Error(`Account does not exist`)
    }
    return result
};

module.exports.updateUserTime = async (status, lastloggedin, userId) => {
    const sql = 'UPDATE users SET userstatus = $1, lastloggedin = $2 WHERE userid = $3 RETURNING *'

    const result = await pool.query(sql, [status, lastloggedin, userId])

    // throws error for params that are not a number
    if (isNaN(userId)) {
        throw new Error(`Key in a valid number`)
    }
    return result.rows[0]
}

/// ///////////////////////////////////////////////////
// Update plot ID for user dialogue
/// ///////////////////////////////////////////////////
module.exports.updatePlotIdModel = async (plotid, userid) => {
    // sql statement 
    const sql = `
    UPDATE users 
    SET plotid = $1
    WHERE userid = $2
    RETURNING *`

    const result = await pool.query(sql, [plotid, userid])

    // throws error if npcId is invalid
    if (isNaN(plotid) || isNaN(userid)) {
        throw new Error(`Dialogue Id entered is not a number! Please enter a number.`)
    }

    // return the returned result from the query
    return result
}

/// ///////////////////////////////////////////////////
// Export get all user details by userid function
/// ///////////////////////////////////////////////////
module.exports.getPlotIdModel = async (userid) => {
    // sql statement 
    const sql = 'SELECT plotid FROM users WHERE userid = $1'

    const result = await pool.query(sql, [userid])
    if (result.rows.length === 0) {
        throw new Error(`No such user`)
    }
    // return query result
    return result.rows;
}

/// ///////////////////////////////////////////////////
// Export update user's equipped item function
/// ///////////////////////////////////////////////////
module.exports.updateUserEquip = async (userid, itemid) => {

    const sql = `UPDATE users SET equippeditem = $1 where userid = $2`

    const result = await pool.query(sql, [itemid, userid])
    if (result.rowCount == 0) {
        throw new Error(`User:${userid} not updated`)
    }
    return result;
};

/// ///////////////////////////////////////////////////
// Export get floors function
/// ///////////////////////////////////////////////////
module.exports.getAllUserByFloor = async (floorId) => {
    // sql statement 
    const sql = `SELECT username, userstatus, lastloggedin
                FROM users
                WHERE floorid = $1 
                AND role = 'Player'
                ORDER BY userid ASC`

    const result = await pool.query(sql, [floorId])

    // throws error for empty floor data in floor entity
    if (result.rows.length === 0) {
        throw new Error(`No users exist`)
    }

    // return query result
    return result.rows
}

module.exports.updateUserGameStatus = async (status, userId) => {
    const sql = 'UPDATE users SET gamestatus = $1 WHERE userid = $2 RETURNING *'

    const result = await pool.query(sql, [status, userId])

    // throws error for params that are not a number
    if (isNaN(userId)) {
        throw new Error(`Key in a valid number`)
    }
    return result.rows[0]
}

/// ///////////////////////////////////////////////////
// Export get users standing function
/// ///////////////////////////////////////////////////
module.exports.userStanding = async (floorid) =>{
    const sql = 'SELECT * FROM users WHERE floorid = $1 LIMIT 5'
    const result = await pool.query(sql, [floorid])
    if (result.rowCount == 0) {
        throw new Error(`No such user`)
    }
    return result.rows
}

/// ///////////////////////////////////////////////////
// Export update users game progress function
/// ///////////////////////////////////////////////////
module.exports.userGameprogress = async (userid,gameprogress) =>{
    const sql = 'UPDATE gameprogress SET gameprogress = $2 , userid = $1'
    const result = await pool.query(sql, [userid,gameprogress])
    if (result.rowCount == 0) {
        throw new Error(`Did not update game progress`)
    }
    return result.rows
}

module.exports.getFriendsList = async (userId) => {
    const sql = `   SELECT u.userid, u.username, u.imageid, i.imageurl, u.userstatus, ur.friendshipstate, ur.dateofcreation
                    FROM users u
                    INNER JOIN image i  
                    ON u.imageid = i.imageid
                    INNER JOIN userrelations ur
                    ON (u.userid = ur.initiateuserid
                    OR u.userid = ur.otheruserid)
                    WHERE (ur.initiateuserid = $1
                    OR ur.otheruserid = $1)
                    AND relationstate = 'friends'
                    AND u.userid != $1
                    `

    const result = await pool.query(sql, [userId])

    // throws error for params that are not a number
    if (isNaN(userId)) {
        throw new Error(`Key in a valid number`)
    }
    return result.rows
}

/// ///////////////////////////////////////////////////
// Export get user's friend requests function
/// ///////////////////////////////////////////////////
module.exports.getFriendRequests = async (userId) => {
    // sql statement 
    const sql = `   SELECT u.userid, u.username, u.imageid, i.imageurl, u.userstatus, ur.friendshipstate, ur.dateofcreation
                    FROM users u
                    INNER JOIN image i
                    ON u.imageid = i.imageid
                    INNER JOIN userrelations ur
                    ON (u.userid = ur.initiateuserid
                    OR u.userid = ur.otheruserid)
                    WHERE (ur.otheruserid = $1)
                    AND relationstate = 'requested'
                    AND u.userid != $1
                    `
    const result = await pool.query(sql, [userId])
    return result.rows
}

/// ///////////////////////////////////////////////////
// Export create user friend request function
/// ///////////////////////////////////////////////////
module.exports.createFriendRequest = async (requesterUserId, requestedUserId) => {
    // sql statement 
    const sql = `   INSERT INTO userrelations (relationState, initiateUserID, otherUserID)
                    VALUES ('requested', $1, $2)`

    const result = await pool.query(sql, [requesterUserId, requestedUserId])
    return result.rows[0]
}

/// ///////////////////////////////////////////////////
// Export accept user friend request function
/// ///////////////////////////////////////////////////
module.exports.acceptFriendRequest = async (requesterUserId, requestedUserId) => {
    // sql statement 
    const sql = `   UPDATE userrelations SET relationState = 'friends',
                    friendshipstate = 'friends',
                    dateofcreation = CURRENT_TIMESTAMP
                    WHERE initiateuserid = $1 AND otheruserid = $2
                `

    const result = await pool.query(sql, [requesterUserId, requestedUserId])
    return result.rows[0]
}

/// ///////////////////////////////////////////////////
// Export delete user relation function
/// ///////////////////////////////////////////////////
module.exports.deleteRelation = async (requesterUserId, requestedUserId) => {
    // sql statement 
    const sql = `   DELETE from userrelations
                    WHERE (initiateuserid = $1 AND otheruserid = $2) OR (otheruserid = $1 AND initiateuserid = $2)
                `

    const result = await pool.query(sql, [requesterUserId, requestedUserId])
    return result.rowCount
}

/// ///////////////////////////////////////////////////
// Export create user block request function
/// ///////////////////////////////////////////////////
module.exports.blockUser = async (initiateUserId, targetUserId) => {
    // sql statement
    const sql = `   INSERT INTO userrelations (relationState, initiateuserid, otherUserID)
                    VALUES ('blocked', $1, $2)
                    ON CONFLICT (initiateuserid, otheruserid) DO UPDATE SET relationState = 'blocked'
                `

    const result = await pool.query(sql, [initiateUserId, targetUserId])
    return result
}


/// ///////////////////////////////////////////////////
// Export retrieve all players and user's relations with players function
/// ///////////////////////////////////////////////////
module.exports.getAllUsersAndRelations = async (userId) => {
    // sql statement
    const sql = `   SELECT u.userid, u.username, u.imageid, i.imageurl, u.userstatus, u.lastloggedin, ur.relationstate, ur.friendshipstate, ur.initiateuserid
                    FROM users u
                    INNER JOIN image i
                    ON u.imageid = i.imageid
                    left JOIN userrelations ur
                    ON ((u.userid = ur.initiateuserid AND (ur.otheruserid = $1))
                    OR (u.userid = ur.otheruserid AND (ur.initiateuserid = $1)))
                    WHERE u.userid != $1
                    AND (ur.relationstate != 'blocked'
                    OR ur.relationstate IS NULL)
                    ORDER BY u.userid
                `

    const result = await pool.query(sql, [userId])
    return result.rows
}
/// ///////////////////////////////////////////////////
// Export get user's blocked list function
/// ///////////////////////////////////////////////////
module.exports.getBlockedUsers = async (userId) => {
    // sql statement 
    const sql = `   SELECT u.userid, u.username, u.imageid, i.imageurl, u.userstatus, ur.friendshipstate, ur.dateofcreation
                    FROM users u
                    INNER JOIN image i
                    ON u.imageid = i.imageid
                    INNER JOIN userrelations ur
                    ON (u.userid = ur.initiateuserid
                    OR u.userid = ur.otheruserid)
                    WHERE (ur.initiateuserid = $1)
                    AND relationstate = 'blocked'
                    AND u.userid != $1
                    `
    const result = await pool.query(sql, [userId])
    return result.rows
}

/// ///////////////////////////////////////////////////
// Export to create user's new play progress 
/// ///////////////////////////////////////////////////
module.exports.setGameProgressValue = async (userid) => {
    // sql statement
    const sql = `INSERT INTO gameprogress (gameprogress, userid) values (0 , $1)
	                RETURNING * `

    const result = await pool.query(sql, [userid])
    return result.rows[0]
}

/// ///////////////////////////////////////////////////
// Export get user's play progress 
/// ///////////////////////////////////////////////////
module.exports.getGameProgressValue = async (userid) => {
    // sql statement
    const sql = `SELECT * FROM gameprogress WHERE userid = $1
	                RETURNING * `
    const result = await pool.query(sql, [userid])
    return result.rows[0]
}

/// ///////////////////////////////////////////////////
// Export create user function
/// ///////////////////////////////////////////////////
module.exports.addUserGameProgressM = async (userid) => {
    // sql statement 
    const sql = `INSERT into gameprogress (gameprogress,userid) values (0,$1) RETURNING *`

    const result = await pool.query(sql, [userid])
    console.log(result)
    return result.rows[0]
}