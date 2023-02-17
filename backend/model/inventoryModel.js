const pool = require('../db');

/// ///////////////////////////////////////////////////
// Export get all inventory
/// ///////////////////////////////////////////////////
module.exports.getAllInventoryM = async () => {
  // sql statement 
  const sql = 'SELECT userid, itemid, quantity FROM public.inventory ORDER BY userid ASC'

  const getAllSQL = await pool.query(sql)
  // return query result
  return getAllSQL.rows
}


/// ///////////////////////////////////////////////////
// Export get all inventory by player id function
/// ///////////////////////////////////////////////////
module.exports.getInventoryByIdM = async (userid) => {
    // sql statement 
    const sql = `SELECT inv.userid, inv.itemid, inv.quantity, items.itemname, image.imageurl, items.levelreq 
                 FROM inventory inv
                 INNER JOIN items ON inv.itemid = items.itemid
                 INNER JOIN image ON items.imageid = image.imageid
                 WHERE inv.userid = $1`
                 
                 
  
    const retrieveAllbyPidSQL = await pool.query(sql, [userid])
    // return query result
    return retrieveAllbyPidSQL.rows
  }

/// ///////////////////////////////////////////////////
// Export get inventory by itemid
/// ///////////////////////////////////////////////////
module.exports.getInventoryByItemIdM = async (userid, itemid) => {
  // sql statement 
  const sql = `SELECT inv.userid, inv.itemid, inv.quantity, items.itemname, image.imageurl, items.levelreq
               FROM inventory inv 
               INNER JOIN items ON inv.itemid = items.itemid
               INNER JOIN image ON items.imageid = image.imageid           
               WHERE inv.userid = $1 AND inv.itemid = $2`
               
               

  const retrieveByIidSQL = await pool.query(sql, [userid, itemid])
  // return query result
  return retrieveByIidSQL.rows
}
  
  /// ///////////////////////////////////////////////////
  // Export insert inventory for player id function, buying from shop
  /// ///////////////////////////////////////////////////
  module.exports.insertInventoryM = async (userid, itemid, quantity) => {
    // sql statement 
    // ON CONFLICT will conflict with the UNIQUE constraint on the userid and itemid columns, once conflict is detected, it will update the quantity instead of inserting a new row
    const sql = `INSERT INTO inventory (userid,itemid,quantity) VALUES ($1,$2,$3) ON CONFLICT (userid,itemid) DO UPDATE SET quantity = inventory.quantity + $3 RETURNING itemid, quantity`
    const createSQL = await pool.query(sql, [userid, itemid, quantity])
    // return query result
    return createSQL
  }
  
  /// ///////////////////////////////////////////////////
  // Export delete inventory, delete item
  /// ///////////////////////////////////////////////////
  module.exports.updateDeleteInventoryM = async (userid, itemid, quantity) => {
    // sql statement delete and update
    
    // rowCount is the number of rows affected by the query
    // rowCount = 1, means the item is deleted
    const sql = `DELETE FROM inventory WHERE userid = $1 AND itemid = $2 AND quantity = $3 RETURNING itemid, quantity`
  
    const deleteSQL = await pool.query(sql, [userid, itemid, quantity])
    // console.log(deleteSQL.rowCount)
    // if rowCount = 0, means the item is not deleted, so update the quantity instead
      if (deleteSQL.rowCount == 0) {
        const sql = `UPDATE inventory SET quantity = inventory.quantity - $3 WHERE userid = $1 AND itemid = $2 RETURNING itemid, quantity`
        const updateSQL = await pool.query(sql, [userid, itemid, quantity])
        // console.log(updateSQL.rowCount)
        return updateSQL
      }
    // return query result
      
    return deleteSQL
  }

/// ///////////////////////////////////////////////////
// Export get inventory by username and itemid
/// ///////////////////////////////////////////////////
module.exports.getInventoryByUserNameM = async (username) => {
  // sql statement 
  const sql = `SELECT inv.userid, inv.itemid, inv.quantity, items.itemname, items.cost, items.levelreq
               FROM inventory inv 
               INNER JOIN users u ON inv.userid = u.userid
               INNER JOIN items ON inv.itemid = items.itemid 
              where u.username = $1`
               
  const userItem = await pool.query(sql, [username])
  // return query result
  return userItem.rows
}