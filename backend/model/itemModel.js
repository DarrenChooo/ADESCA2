const pool = require('../db');

/// ///////////////////////////////////////////////////
// insert Item function
/// ///////////////////////////////////////////////////
module.exports.createItems = async (itemname, cost, levelreq, imageid, critrate, durability, damage, speed) => {

    const sql = `INSERT into public.items (itemname, cost, levelreq, imageid, critrate, durability, damage, speed) values ($1,$2,$3,$4,$5,$6,$7,$8)`

    const items = await pool.query(sql, [itemname, cost, levelreq, imageid, critrate, durability, damage, speed])

    console.log(items)
    return items;
};

/// ///////////////////////////////////////////////////
// retrieve all Items function
/// ///////////////////////////////////////////////////
module.exports.getAllItems = async () => {

    const sql = `   SELECT public.items.itemid, public.items.itemname, public.items.cost, public.items.levelreq, public.items.imageid, public.image.imageurl
                    FROM public.items
                    INNER JOIN public.image ON public.items.imageid = public.image.imageid;`

    const item = await pool.query(sql)
    return item.rows;
};

/// ///////////////////////////////////////////////////
// retrieve Store Items function
/// ///////////////////////////////////////////////////
module.exports.getStoreItems = async (floorid) => {

    const sql = `   SELECT items.itemid, items.itemname, items.cost, items.levelreq, items.imageid, image.imageurl
                    FROM items
                    INNER JOIN image ON items.imageid = image.imageid WHERE items.levelreq <= $1 ;`

    const item = await pool.query(sql, [floorid])
    return item;
};

/// ///////////////////////////////////////////////////
// retrieve Item by ID function
/// ///////////////////////////////////////////////////
module.exports.getItems = async (itemid) => {

    const sql = `   SELECT items.itemid, items.itemname, items.cost, items.levelreq, items.imageid,  items.damage, items.speed, items.critrate, items.durability, 
                    image.imageurl
                    FROM items
                    INNER JOIN image ON items.imageid = image.imageid
                    where items.itemid = $1`

    const item = await pool.query(sql, [itemid])
    return item;
};

/// ///////////////////////////////////////////////////
// retrieve Item by search function
/// ///////////////////////////////////////////////////
module.exports.getItemsByName = async (itemname) => {

    const sql = `   SELECT items.itemid, items.itemname, items.cost, items.levelreq, items.imageid, image.imageurl
                    FROM items
                    INNER JOIN image ON items.imageid = image.imageid
                    where items.itemname ILIKE $1`

    const item = await pool.query(sql, [`%${  itemname  }%`])
    return item.rows;
};

/// ///////////////////////////////////////////////////
// update Item function
/// ///////////////////////////////////////////////////
module.exports.updateItems = async (itemid, itemname, cost, levelreq, imageid, critrate, durability, damage, speed) => {

    const sql = `UPDATE public.items SET itemname=$1,cost=$2,levelreq=$3,imageid=$4,critrate=$5,durability=$6,damage=$7,speed=$8where itemid = $9`

    const item = await pool.query(sql, [itemname, cost, levelreq, imageid, critrate, durability, damage, speed, itemid])

    return item;
};

/// ///////////////////////////////////////////////////
// delete Item function
/// ///////////////////////////////////////////////////
module.exports.deleteItems = async (itemid) => {

    const sql = `DELETE FROM public.items WHERE itemid = $1`

    const item = await pool.query(sql, [itemid])

    return item;
};


/// ///////////////////////////////////////////////////
// retrieve Equipped Items statistics
/// ///////////////////////////////////////////////////
module.exports.retrieveEquippedItemData = async () => {

    const sql = `   SELECT users.equippeditem, count(users.equippeditem),
                    items.itemid, items.itemname, items.cost, items.levelreq, items.imageid,  items.damage, items.speed, items.critrate, items.durability,
                    image.imageurl
                    FROM users
                    INNER JOIN items on users.equippeditem = items.itemid
                    INNER JOIN image on items.imageid = image.imageid
                    GROUP BY users.equippeditem, items.itemid, items.itemname, items.cost, items.levelreq, items.imageid,  items.damage, items.speed, items.critrate, items.durability, image.imageurl`

    const stats = await pool.query(sql, [])

    return stats.rows;
};