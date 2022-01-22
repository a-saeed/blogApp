const updateUser = require('../controllers/userController')
const checkAuthentication = require('../middlewares/checkAuthentication')

const userRouter = require('express').Router()

//update authenticated users only
userRouter.put('/:id', checkAuthentication, updateUser)

module.exports  = userRouter