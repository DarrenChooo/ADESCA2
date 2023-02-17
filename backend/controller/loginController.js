
const config = require('dotenv')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../model/userModel');

module.exports.loginUser = (req, res, next) => {
    const {username} = req.body;
    const {password} = req.body;

    user.loginUserM(username,password)
    .then((result) => {
        console.log(result)
        // let data = {
        //     username: result.rows[0].username,
        //     userid: result.rows[0].userid,
        //     role: result.rows[0].role,
        //     floorid: result.rows[0].floorid,
        //     token: jwt.sign({ 
        //         username: result.rows[0].username , 
        //         userid: result.rows[0].userid, 
        //         role: result.rows[0].role,
        //         floorid: result.rows[0].floorid }, 
        //         process.env.JWTKey, {
        //         expiresIn: 86400 //Expires in 24 hrs
        //     })
        // }
        res.status(200).send(jwt.sign({ 
            username: result.rows[0].username , 
            userid: result.rows[0].userid, 
            role: result.rows[0].role,
            floorid: result.rows[0].floorid }, 
            process.env.JWTKey, {
            expiresIn: 86400 // Expires in 24 hrs
        }));
    })
    .catch((err) =>{
        console.error(err);
        res.status(500).send('Credentials are not valid.')
    })
}