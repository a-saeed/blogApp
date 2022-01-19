const authRouter = require('express').Router()
const register = require('../controllers/register');

authRouter.post("/register", register)

module.exports = authRouter