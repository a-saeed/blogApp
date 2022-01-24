const categoryModel = require('../model/categoryModel');

//post a new category 
const postCategory = async (req, res, next) => {
    try {
        const newCat = new categoryModel(req.body);
        await newCat.save().catch(err => { res.statusCode = 500; throw "error connecting to the database" })
        res.status(200).json(newCat);
    } catch (err) {
        next(new CustomError(res.statusCode, err))
    }
}

module.exports = {postCategory}