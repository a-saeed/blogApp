const CustomError = require("../model/customError");
const postModel = require("../model/postModel")

const createPost = async (req, res, next) => {
    try {
        //username must match a user in db
        if (req.user.username !== req.body.username) {
             res.statusCode = 401; throw "usernames must match";
        }
        const post = new postModel(req.body)
        const newPost = await post.save().catch(err => { res.statusCode = 500; throw "server error, either a field is missing or a post already exists with the same title "})
        res.status(200).json(newPost);
    } catch (err) {
        next(new CustomError(res.statusCode, err))
    }
}

const updatePost = async (req, res, next) => {
    try {
        //check if the designated post exists
        //and if it belongs to the current logged in user
        if (req.user.username !== req.body.username) {
            res.statusCode = 401; throw "you don't have access to this post.."
        }
        const updatedPost = await postModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).catch(err => { res.status = 401; throw "this post doesn't exist..." });
        res.status(200).json(updatedPost);

    } catch (err) {
        next(new CustomError(res.statusCode, "an error occured while editing post, please try again =>>>> " + err))
    }
}

const deletePost = async (req, res, next) => {
    try {
        //return post and check if current user has access to it
        const post = await postModel.findById(req.params.id).catch(err => { res.statusCode = 500; throw "post doesn't exist" });
        if (req.user.username !== post.username) { res.statusCode = 401; throw "you don't have access to this post" };
        await post.delete();
        res.status(200).json("post deleted successfully");
    }
    catch (err) {
        next(new CustomError(res.statusCode, err))
    }
}

//get all posts of current user
const getPosts = async (req, res, next) => {
    /**
     * check if it is a query parameter
     * we can retrieve posts with certain categories 
     * or posts of some user other than the current logged in user
     */
    const username = req.query.user; 
    const category = req.query.cat; 
    try {
        //post is an array the will hold returned posts
        let posts;
        //does the url specify a username?
        if (username)
            posts = await postModel.find({ username: username }).catch(err => { res.statusCode = 404; throw "error in connection to db"}); //we could make it {username} for short
        /**
         * does the url specify certain categories of posts?
         * match and return entire posts that has the same category
         */
        else if (category)
            posts = await postModel.find({ categories: { $in: [category] } }).catch(err => { res.statusCode = 404; throw "error in connection to db"})
        //if the url doesn't contain any query parameters, return all posts in database
        else
            posts = await postModel.find().catch(err => { res.statusCode = 404; throw "error in connection to db" })
        
        //send response
        res.status(200).json(posts)
    } catch (err) {
        next(new CustomError(res.statusCode, err))
    }
}
  module.exports = { createPost, updatePost, deletePost, getPosts }
