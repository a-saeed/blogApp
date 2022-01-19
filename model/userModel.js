const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    profilePic: { type: String, default: "" },
},
    {
        timestamps: true,
        //hide the password when user info is returned
        toJSON: {
            transform: (doc, ret) => {
                delete ret.password
            }
        }
    }
    
);

module.exports = mongoose.model("user", userSchema);



