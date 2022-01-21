const tokenModel = require('../model/token');
const userModel = require('../model/userModel');
const CustomError = require("../model/customError");

/*checks if user is authenticated by comparing
/*the token attached to req.cookie
/*and token stored in db
*/
const checkAuthentication = async (req, res, next) => { 
    try {
        //parse cookie searching for a token with the name session
        const token = req.cookies.session //returns token id
        if (!token) { res.statusCode = 401; throw "unauthorized" }
        const storedToken = await tokenModel.findOne({ _id: token }).catch(err => { res.statusCode = 500; throw "server error" })
        //if no token exists in db, then user is unauthorized
        if (!storedToken) { res.statusCode = 401; throw "unauthorized " }
        //else, return authorized user
        const user = await userModel.findOne({ _id: storedToken.userId }).catch(err => { res.statusCode = 500; throw "server error" })
        //attach user to request body
        req.user = user;  
        next();
    } catch (err) {
        next(new CustomError(res.statusCode, err))
    }
}

module.exports = checkAuthentication;
