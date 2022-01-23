const { createPost, updatePost }  = require('../controllers/postController')
const checkAuthentication = require('../middlewares/checkAuthentication')

const postRouter = require('express').Router()

//{create-update} new post for auth users
postRouter.post("/", checkAuthentication, createPost)
postRouter.put("/:id", checkAuthentication, updatePost)


module.exports  = postRouter