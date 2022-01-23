const  createPost  = require('../controllers/postController')
const checkAuthentication = require('../middlewares/checkAuthentication')

const postRouter = require('express').Router()

//create new post for auth users
postRouter.post("/", checkAuthentication, createPost)


module.exports  = postRouter