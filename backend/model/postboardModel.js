/// ///////////////////////////////////////////////////
// INCLUDES
/// ///////////////////////////////////////////////////
const { Query } = require('pg');
const pool  = require('../db');


/// ///////////////////////////////////////////////////
// Export get post function
/// ///////////////////////////////////////////////////
module.exports.getAllPostM = async (userid) => {
    // sql statement 
        const sql = 'SELECT * FROM postboard'
        const result = await pool.query(sql,[])
        if(result.rowCount == 0){
            throw new Error(`cant get all postboard`)
        }
    return result.rows;
}

/// ///////////////////////////////////////////////////
// Export get post by postid function
/// ///////////////////////////////////////////////////
module.exports.getPostByIdM = async (postid) => {
    // sql statement 
    const sql = 'SELECT * FROM postboard WHERE postid = $1'

    const result = await pool.query(sql, [postid])
    if (result.rows.length === 0) {
        throw new Error(`No such user`)
    }
    // return query result
    return result.rows[0]
}

/// ///////////////////////////////////////////////////
// Export create post function
/// ///////////////////////////////////////////////////
module.exports.createPostM = async(postdesc,userid) => {
    // sql statement 
    const sql = `INSERT into postboard (postdesc,userid) values ($1,$2) RETURNING *`
    const result = await pool.query(sql,[postdesc,userid])
    console.log(result.rows[0].postdesc)
    console.log(result.rows[0].postdesc)
    return result.rows[0]
}

/// ///////////////////////////////////////////////////
// Export update user's post function
/// ///////////////////////////////////////////////////
module.exports.updateUserPostByPostIdM = async (postdesc, postid) => {

    const sql = `UPDATE postboard SET postdesc = $1 where postid = $2 RETURNING *`

    const result = await pool.query(sql, [postdesc,postid])
    if (result.rowCount == 0){
        throw new Error(`post not updated`)
    }
    return result;
};

/// ///////////////////////////////////////////////////
// Export delete post function
/// ///////////////////////////////////////////////////
module.exports.deletePostByIdM = async (postid) => {
    // sql statment
    const sql = 'DELETE FROM postboard WHERE postid = $1'

    const result = await pool.query(sql, [postid])
    // throws error if userd entered is not a number
    if (isNaN(postid)) {
        throw new Error(`Post Id entered is not a number! Please enter a number.`)
    }
    // throws error if userid is invalid
    if (result.rowCount === 0) {
        throw new Error(`Post ${postid} doesn't exist!`)
    }
    // return result
    return result.rows
};

module.exports.getPostByUserIdM = async (userid) => {
    // sql statement 
    const sql = 'SELECT * FROM postboard WHERE userid = $1'

    const result = await pool.query(sql, [userid])
    if (result.rows.length === 0) {
        throw new Error(`No such user`)
    }
    // return query result
    return result.rows
}