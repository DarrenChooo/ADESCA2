const pool = require('../db');

/// ///////////////////////////////////////////////////
// Export get all currency 
/// ///////////////////////////////////////////////////
module.exports.getAllCurrencyM = async () => {
    // sql statement 
    const sql = `SELECT c.currencyid, c.userid, c.quantity, u.username
    FROM currency c
    INNER JOIN users u ON c.userid = u.userid
    ORDER BY userid ASC`
  
    const getAllSQL = await pool.query(sql)
    // return query result
    return getAllSQL.rows
  }


/// ///////////////////////////////////////////////////
// Export get currency by userid
/// ///////////////////////////////////////////////////
module.exports.getCurrencyByIdM = async (userid) => {
    // sql statement 
    const sql = `SELECT c.currencyid, c.userid, c.quantity, u.username
    FROM currency c
    INNER JOIN users u ON c.userid = u.userid
    WHERE u.userid = $1`
  
    const getByIdSQL = await pool.query(sql, [userid])
    // return query result
    return getByIdSQL
  }

/// ///////////////////////////////////////////////////
// Export update currency by userid
/// ///////////////////////////////////////////////////
module.exports.putCurrencyByIdM = async (userid, quantity) => {
    // sql statement 
    const sql = 'UPDATE currency SET quantity = $2  WHERE userid = $1 RETURNING userid, quantity'
  
    const putByIdSQL = await pool.query(sql, [userid, quantity])
    // return query result
    return putByIdSQL.rows
  }

/// ///////////////////////////////////////////////////
// Export insert currency by userid
/// ///////////////////////////////////////////////////
module.exports.insertCurrencyM = async (userid) => {
    // sql statement 
    const sql = `INSERT INTO currency (userid, quantity) VALUES ($1, 100) RETURNING userid, quantity`

    const insertSQL = await pool.query(sql, [userid])
    // return query result
    return insertSQL.rows
  }

/// ///////////////////////////////////////////////////
// retrieve Item by search function
/// ///////////////////////////////////////////////////
module.exports.getCurrencyByUsernameM = async (username) => {

  const sql = `   SELECT c.currencyid, c.userid, c.quantity, u.username
                  FROM currency c
                  INNER JOIN users u ON c.userid = u.userid
                  where u.username ILIKE $1`

  const user = await pool.query(sql, [`%${  username  }%`])
  return user.rows;
};



