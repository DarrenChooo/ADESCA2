const fs = require('fs');

const multer = require('multer')
const image = require('../model/imageModel.js');
 
const storage = multer.diskStorage({
    destination (req, file, cb) {
      cb(null, 'images/')
    },
    filename (req, file, cb) {
      cb(null, Date.now() + file.originalname) // Appending extension
    }
})

const upload = multer({ storage }).single('imagefile');


/// ///////////////////////////////////////////////////
// Export handling of request of insert Image
/// //////////////////////////////////////////////////
module.exports.createImage = (req, res, next) => {

    const {imageurl} = req.body;
    const {imagename} = req.body;
    const {imagesorter} = req.body;

    image.createImage(imageurl, imagename, imagesorter)
    .then((result) => {
        res.status(201).json(result.rows[0]);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({Error: err.message})
    })
};


/// ///////////////////////////////////////////////////
// Export handling of request of insert Image File
/// //////////////////////////////////////////////////
module.exports.uploadImageFile = (req, res, next) => {

    upload(req, res, function(err){
        if(!req.file){
            res.status(406).json({Error: "Images not received"})
        } else{
            if(err){
                res.status(500).json({Error: err.message})
            }
            // Saving file locally
            res.status(201).send(req.file.filename)
        }
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of retrieve Image by ID
/// //////////////////////////////////////////////////
module.exports.getImage = (req, res, next) => {

    const imageid = req.params.id

    image.getImage(imageid)
    .then((result) => {
        if(result.rowCount == 0){
            res.status(404).json({Error: "Image not found"})
        } else {
            res.json(result.rows[0]);
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({Error: err.message})
    })
};

/// ///////////////////////////////////////////////////
// Export handling of request of retrieve Image by search
/// //////////////////////////////////////////////////
module.exports.getImageByName = (req, res, next) => {

    const {imagename} = req.params

    image.getImageByName(imagename)
    .then((result) => {
        console.log(result)
        res.send(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({Error: err.message})
    })
};

/// ///////////////////////////////////////////////////
// Export handling of request of retrieve all Images
/// //////////////////////////////////////////////////
module.exports.getAllImage = (req, res, next) => {

    const {pagination} = req.params

    image.getAllImage(pagination)
    .then((result) => {
        console.log(result)
        res.status(200).json(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({Error: err.message})
    })
};

/// ///////////////////////////////////////////////////
// Export handling of request of update Image
/// //////////////////////////////////////////////////
module.exports.updateImage = (req, res, next) => {

        const imageid = req.params.id
        const {imageurl} = req.body;
        const {imagename} = req.body;
        const {imagesorter} = req.body;

    image.updateImage(imageid, imageurl, imagename, imagesorter)
    .then((result) =>{
        
        if (result.rows[0].imageurl !== imageurl && imageurl !== undefined){
            fs.unlinkSync(`./images/${result.rows[0].imageurl}`)
        }
    })
    .then(() =>{
        res.status(200).json({message: `image ${imageid} has been updated successully`});
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({Error: err.message})
    })
};

/// ///////////////////////////////////////////////////
// Export handling of request of update Image File
/// //////////////////////////////////////////////////
module.exports.updateImageFile = (req, res, next) => {

    upload(req, res, function(err){
        if(!req.file){
            res.status(406).send("Images not received")
        } else{
            if(err){
                res.status(500).send(`Server error occurred: ${  err.message}`)
            }
  
            res.status(201).send(req.file.filename)
        }
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of delete Image
/// //////////////////////////////////////////////////
module.exports.deleteImage = (req, res, next) => {

    const imageid = req.params.id

    image.deleteImage(imageid)
    .then((result) => {
        if(result.rowCount == 0){
            res.status(404).json({Error: "Image not found"})
        } else {
            res.status(200).json({Message: `image ${imageid} successfully deleted`});
            fs.unlinkSync(`./images/${result.rows[0].imageurl}`)
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({Error: err.message})
    })
};

/// ///////////////////////////////////////////////////
// Export handling of request of retrieve all Images that are NPCs
/// //////////////////////////////////////////////////
module.exports.getAllNPCsImage = (req, res, next) => {

    image.getAllNPCsImage()
    // Success
    .then((result) => {
        res.status(200).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(404).send('Failed to get all floors')
    })
};