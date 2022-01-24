const { postCategory } = require('../controllers/categoryController')
const checkAuthentication = require('../middlewares/checkAuthentication')

const categoryRouter = require('express').Router()

categoryRouter.post("/", checkAuthentication, postCategory)

module.exports = categoryRouter;