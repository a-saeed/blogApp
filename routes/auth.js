const authRouter = require('express').Router()
const register = require('../controllers/register');
const login = require('../controllers/login');
const logout = require('../controllers/logout');
const checkAuthentication = require('../middlewares/checkAuthentication');

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.post("/logout",checkAuthentication, logout)

module.exports = authRouter