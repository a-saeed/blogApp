const CustomError = require("../model/customError");
const postModel = require("../model/postModel")

const createPost = async (req, res, next) => {
    try {
        const post = new postModel(req.body)
        const newPost = await post.save().catch(err => { res.statusCode = 500; throw "server error, either a field is missing or a post already exists with the same title "})
        res.status(200).json(newPost);
    } catch (err) {
        next(new CustomError(res.statusCode, err))
    }
}

module.exports = createPost