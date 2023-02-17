const jwt = require("jsonwebtoken");
const config = require("dotenv");

function verifyToken(req, res, next) {
    // declare the autorization in the header in the front end when sending request (link:https://www.codegrepper.com/code-examples/javascript/fetch+with+bearer+token)
    let token = req.headers.authorization; // retrieve authorization header's content
    if (!token || !token.includes("Bearer")) { // process the token
        res.status(403);
        return res.send({ auth: "false", message: "Not authorized!" });
    }
        token = token.split("Bearer ")[1]; // obtain the token's value
        console.log(token);
        jwt.verify(token, process.env.JWTkey, (err, decoded) => { // verify token
            if (err) {
                res.status(403);
                return res.end({ auth: false, message: "Not authorized!" });
            }
                req.userid = decoded.userid;
                req.username = decoded.username; // decode the userid and store in req for use
                req.role = decoded.role; // decode the role and store in req for use
                return next();
        });
}

module.exports = verifyToken;