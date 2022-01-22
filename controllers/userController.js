const userModel = require("../model/userModel")
const bcrypt = require('bcrypt');
const CustomError = require("../model/customError");
const Token = require("../model/token");

//update user info 
const updateUser = async (req, res, next) => {
    try {
        //if password is included in the req body, encrypt it
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}).catch(err => { res.statusCode = 500; throw "server error" })
        res.status(200).json(updatedUser);
    } catch (err) {
        next(new CustomError(res.statusCode, err))
    }
}

module.exports = updateUser