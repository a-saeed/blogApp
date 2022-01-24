const { createPost, updatePost, deletePost }  = require('../controllers/postController')
const checkAuthentication = require('../middlewares/checkAuthentication')

const postRouter = require('express').Router()

//{create-update} new post for auth users
postRouter.post("/", checkAuthentication, createPost)
postRouter.put("/:id", checkAuthentication, updatePost)
postRouter.delete("/:id", checkAuthentication, deletePost)


module.exports  = postRouter