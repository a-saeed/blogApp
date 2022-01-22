const { updateUser, deleteUser, getCurrentUser} = require('../controllers/userController')
const checkAuthentication = require('../middlewares/checkAuthentication')

const userRouter = require('express').Router()

//(update-delete-get) authenticated users only
userRouter.put('/:id', checkAuthentication, updateUser)
userRouter.delete('/:id', checkAuthentication, deleteUser)
userRouter.get('/', checkAuthentication, getCurrentUser)

module.exports  = userRouter