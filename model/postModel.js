const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    usernmae: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    profilePic: { type: String, default: "" },
},
    { timestamps: true }
);

module.exports = mongoose.model("post", postSchema);