const router = require('express').Router()
const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const CustomError = require('../model/customError');
const Token = require('../model/token');

//register new user to the system
const registerUser = async (req, res, next) => {
    try {
        //encrypt the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        //create a new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        //save the new user to the DB
        const user = await newUser.save()
        //generate a token for new logged in user and save it in db
        const token = new Token({ userId: user._id })
        const newToken = await token.save()
        //set cookie with the newly generated token
        res.cookie('session', newToken._id);

        res.status(200).json(user)
    } catch (err) {
        next(new CustomError(500, "a problem happened while registering... " + err.message))
    }
}

module.exports  = registerUser