const router = require('express').Router()
const User = require('../model/userModel');
const bcrypt = require('bcrypt');

//register new user to the system
const registerUser = async (req, res) => {
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
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err.message);
    }
}

module.exports  = registerUser