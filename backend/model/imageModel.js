const pool = require('../db');

/// ///////////////////////////////////////////////////
// insert Image function
/// ///////////////////////////////////////////////////
module.exports.createImage = async (imageurl, imagename, imagesorter) => {
    // sql statement 
    const sql = `INSERT into public.image (imageurl,imagename,imagesorter) values ($1,$2,$3) RETURNING imagename`

    const image = await pool.query(sql, [imageurl, imagename, imagesorter])
    // return query result
    console.log(image)
    return image;
};

/// ///////////////////////////////////////////////////
// retrieve Image by ID function
/// ///////////////////////////////////////////////////
module.exports.getImage = async (imageid) => {
    // sql statement 
    const sql = `SELECT * FROM public.image WHERE imageid = $1`

    const image = await pool.query(sql, [imageid])
    // return query result
    console.log(image)
    return image;
};

/// ///////////////////////////////////////////////////
// retrieve Image by search function
/// ///////////////////////////////////////////////////
module.exports.getImageByName = async (imagename) => {
    // sql statement 
    const sql = `SELECT * FROM image WHERE imagename ILIKE $1`

    const image = await pool.query(sql, [`%${  imagename  }%`])
    // return query result
    console.log(image)
    return image.rows;
};

/// ///////////////////////////////////////////////////
// retrieve Image function (with pagination)
/// ///////////////////////////////////////////////////
module.exports.getAllImage = async (pagination) => {
    // sql statement 
    const sql1 = `SELECT * FROM image ORDER BY imageid ASC LIMIT 12 OFFSET $1`
    const sql2 = `SELECT COUNT(imageid) FROM image`

    const image = await pool.query(sql1, [(pagination - 1) * 12])
    const imageCount = await pool.query(sql2)

    // return query result
    return [image.rows, imageCount.rows];
};

/// ///////////////////////////////////////////////////
// update Image function
/// ///////////////////////////////////////////////////
module.exports.updateImage = async (imageid, imageurl, imagename, imagesorter, imagefile) => {

    const sql = `UPDATE image 
            SET imageurl = COALESCE ($1, subquery.imageurl), 
            imagename = COALESCE ($2, subquery.imagename), 
            imagesorter = COALESCE ($3, subquery.imagesorter) 
            FROM (SELECT imageurl, imagename, imagesorter FROM image WHERE imageid = $4) AS subquery
            WHERE imageid = $4 RETURNING subquery.imageurl`

    const image = await pool.query(sql, [imageurl, imagename, imagesorter, imageid])
        console.log(image)
    if (image.rowCount == 0){
        throw new Error(`image not found`)
    }
    return image;
};

/// ///////////////////////////////////////////////////
// delete Image function
/// ///////////////////////////////////////////////////
module.exports.deleteImage = async (imageid) => {

    const sql = `DELETE FROM public.image WHERE imageid = $1 RETURNING imageurl`

    const image = await pool.query(sql, [imageid])

    return image;
};

/// ///////////////////////////////////////////////////
// retrieve Image function (with pagination)
/// ///////////////////////////////////////////////////
module.exports.getAllNPCsImage = async () => {
    // sql statement 
    const sql = `SELECT imageurl FROM image WHERE imagesorter = 'NPC' ORDER BY imageid`

    const result = await pool.query(sql, [])

    // return query result
    return result.rows
};