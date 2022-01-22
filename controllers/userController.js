const userModel = require("../model/userModel")
const bcrypt = require('bcrypt');
const CustomError = require("../model/customError");
const Token = require("../model/token");
const postModel = require("../model/postModel");

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

//delete user
const deleteUser = async (req, res, next) => {
    try {
        //req object already has user info from checkAuth
        //delete all user posts
        //then delete user
        await postModel.deleteMany({ username: req.user.username }).catch(err => { res.statusCode = 500; throw "server error"})
        await userModel.findByIdAndDelete(req.params.id).catch(err => { res.statusCode = 500; throw "server error"});
        res.status(200).json("user deleted")
    } catch (err) {
        next(new CustomError(res.statusCode, err));
    }
}

//get current logged in user
const getCurrentUser = async (req, res, next) => {
    try {
        const user = userModel.findOne({ _id: req.user._id }).catch(err => { res.statusCode = 500; throw "server error"})
        res.status(200).json(req.user)
    } catch (err) {
        next(new CustomError(res.statusCode, err));
    }
}

module.exports = { updateUser, deleteUser, getCurrentUser }