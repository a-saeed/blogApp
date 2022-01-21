const authRouter = require('express').Router()
const register = require('../controllers/register');
const login = require('../controllers/login');

authRouter.post("/register", register)
authRouter.post("/login", login)

module.exports = authRouter, login