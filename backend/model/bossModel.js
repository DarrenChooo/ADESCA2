const pool = require('../db');


/// ///////////////////////////////////////////////////
// insert Boss function
/// ///////////////////////////////////////////////////
module.exports.createBoss = async (bossname, bosshealth, bossreward, imageid) => {

    const sql = `INSERT into boss (bossname, bosshealth, bossreward, imageid) values ($1,$2,$3,$4)`

    const boss = await pool.query(sql, [bossname, bosshealth, bossreward, imageid])

    console.log(boss)
    return boss;
};

/// ///////////////////////////////////////////////////
// retrieve Boss function
/// ///////////////////////////////////////////////////
module.exports.getBoss = async (bossid) => {

    const sql = `   SELECT boss.bossid, boss.bossname, boss.bosshealth, boss.bossreward, boss.imageid, image.imageurl
                    FROM boss
                    INNER JOIN image ON boss.imageid = image.imageid
                    where boss.bossid = $1`

    const item = await pool.query(sql, [bossid])
    return item.rows[0];
};

/// ///////////////////////////////////////////////////
// update Boss function
/// ///////////////////////////////////////////////////
module.exports.updateBoss = async (bossid, bossname, bosshealth, bossreward, imageid) => {

    const sql = `UPDATE boss SET bossname = $1, bosshealth = $2, bossreward = $3, imageid = $4 where bossid = $5`

    const boss = await pool.query(sql, [bossname, bosshealth, bossreward, imageid, bossid])

    return boss;
};

/// ///////////////////////////////////////////////////
// delete Boss function
/// ///////////////////////////////////////////////////
module.exports.deleteBoss = async (bossid) => {

    const sql = `DELETE FROM boss WHERE bossid = $1`

    const boss = await pool.query(sql, [bossid])

    if (boss.rowCount == 0){
        throw new Error(`item not found`)
    }

    return boss;
};