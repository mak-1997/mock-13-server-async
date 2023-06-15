const jwt = require("jsonwebtoken");
const {UserModel} = require("../model/user.model");

const checkAuthMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "signature");
    console.log(decoded.userID);
    if(decoded.userID){
        req.body.userID = decoded.userID;
        next();
    }
    else{
        return res.status(400).send({"msg" : "Unauthorized : Invalid token"});
    }
    
}

module.exports = {checkAuthMiddleware};