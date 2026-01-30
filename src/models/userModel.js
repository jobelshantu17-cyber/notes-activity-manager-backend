//Import mongoose
const mongoose = require("mongoose");

//Create user schema
const userSchema = new mongoose.Schema(

    //Fields: name, email, password
    {
        name: {
            type: String,
            required: true,
            trim:true
        },
//Email should be unique
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
//Password will be hashed later
        password: {
            type: String,
            required: true
        }
    },
    //Enable timestamps
    {
        timestamps: true
    }

);

const User = mongoose.model("User", userSchema)

//Export user model
module.exports = User;