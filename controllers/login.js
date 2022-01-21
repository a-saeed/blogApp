const userModel = require("../model/userModel")
const bcrypt = require('bcrypt');
const CustomError = require("../model/customError");
const Token = require("../model/token");

const loginUser = async (req, res, next) => {
    try {
        //search existing username
        const user = await userModel.findOne({ username: req.body.username }).catch(err => { res.statusCode = 500; throw "server error, couldn't connect to db"})
        if (!user) { res.statusCode = 401; throw "invalid credentials"}
        //does password match
        const isValidated = await bcrypt.compare(req.body.password, user.password)
        if (!isValidated) { res.statusCode = 401; throw "invalid credentials" }
        //generate new token and save it to db
        const token = new Token({ userId: user._id })
        const newToken = await token.save()
        //set cookie with newly generated token
        res.cookie('session', newToken._id);
        //return user
        res.status(200).json(user)
    } catch (err) {
        next(new CustomError(res.statusCode, err))
    }
}

module.exports = loginUser