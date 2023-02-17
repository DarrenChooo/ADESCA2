const pool = require('../db');


/// ///////////////////////////////////////////////////
// Retreive all Rewards
/// ///////////////////////////////////////////////////
module.exports.getAllRewardsM = async () => {

    const sql = `   SELECT s.itemid, i.itemname,s.imageid,image.imageurl,i.cost
    FROM spinwheel s
    LEFT JOIN items i ON s.itemid = i.itemid
    LEFT JOIN image ON s.imageid = image.imageid
                    `

    const result = await pool.query(sql)
    return result.rows;
};

/// ///////////////////////////////////////////////////
// Retreive Rewards by itemid
/// ///////////////////////////////////////////////////
module.exports.getRewardsByItemIdM = async (itemId) => {

    const sql = `   SELECT s.itemid, i.itemname,s.imageid,image.imageurl,i.cost
    FROM spinwheel s
    LEFT JOIN items i ON s.itemid = i.itemid
    LEFT JOIN image ON s.imageid = image.imageid
    WHERE s.itemid = $1
                    `

    const result = await pool.query(sql, [itemId])
    return result.rows;
};

/// ///////////////////////////////////////////////////
// retrieve Item by search function
/// ///////////////////////////////////////////////////
module.exports.getRewardsByItemNameM = async (itemName) => {

    const sql = `SELECT s.itemid, i.itemname,s.imageid,image.imageurl,i.cost
    FROM spinwheel s
    LEFT JOIN items i ON s.itemid = i.itemid
    LEFT JOIN image ON s.imageid = image.imageid
    WHERE i.itemname ILIKE $1`

    const result = await pool.query(sql, [`%${  itemName  }%`])
    return result.rows;
};

/// ///////////////////////////////////////////////////
// Retreive no of inputs made
/// ///////////////////////////////////////////////////
module.exports.getNoInputsMadeM = async () => {

    const sql = `SELECT rowcount FROM spinwheel`

    const result = await pool.query(sql)
    return result.rows;
};

/// ///////////////////////////////////////////////////
// Insert spinwheel rewards
/// ///////////////////////////////////////////////////
module.exports.insertSpinWheelItemsM = async (itemId) => {
    let string = ''
    const itemIdArray = itemId.split(',')
    console.log(itemId)
    for (let i = 0; i < itemIdArray.length; i++) {
        const inputSQL =`(${itemIdArray[i]},(SELECT imageid FROM items WHERE itemid=${itemIdArray[i]}),(SELECT count(itemid) fROM spinwheel))` 
        if (i == 0) { 
            string += inputSQL
        }
        else {
            string += `,${inputSQL}`
        }
    }
    const sql = `INSERT into spinwheel (itemid, imageid, rowcount) values ${string}`
    const result = await pool.query(sql)

    // return query result
    return result
};



/// ///////////////////////////////////////////////////
// Update spinwheel rewards
/// ///////////////////////////////////////////////////
module.exports.updateSpinWheelItemsM = async (itemId, itemIdParam) => {

    const sql = `UPDATE spinwheel SET itemid = $1,
     imageid = (SELECT imageid FROM items WHERE itemid=$1) 
     WHERE itemid = $2 RETURNING *`

    const result = await pool.query(sql, [itemId, itemIdParam])

    // return the returned result from the query
    return result
};

// //////////////////////////////////////////////////////
// // Delete spinwheel by itemid
// //////////////////////////////////////////////////////
// module.exports.deleteSpinWheelItemsM = async (itemid) => {

//     const sql = `DELETE FROM spinwheel WHERE itemid = $1`

//     const result = await pool.query(sql, [itemid])

//     // return query result
//     return result
// };

/// ///////////////////////////////////////////////////
// delete all spinwheel rewards
/// ///////////////////////////////////////////////////
module.exports.deleteAllSpinWheelItemsM = async () => {

    const sql = `TRUNCATE spinwheel RESTART IDENTITY CASCADE;`

    const result = await pool.query(sql, [])

    // return query result
    return result.rows
};

