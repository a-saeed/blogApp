const mongoose = require('mongoose')   

const TokenSchema = mongoose.Schema({
    userId : { type: mongoose.SchemaTypes.ObjectId, ref: 'user' } // refers to the id field in userModel
})
module.exports =  mongoose.model( 'token' , TokenSchema)