const CustomError = require("../model/customError");
const tokenModel = require("../model/token")


const logout = async (req, res, next) => {
    try {
        //user is already attached to req passed by checkAuthentication
        //find and remove token from db
        await tokenModel.findOneAndRemove({ userId: req.user._id}).catch(err =>{ res.statusCode = 500; throw "server error "})
        res.clearCookie('session');
        res.status(200).json("logged out")

    } catch (err) {
        next(new CustomError(res.statusCode, "error while logging out  " + err))
    }
}

module.exports = logout