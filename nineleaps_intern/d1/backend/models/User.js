// const mongoose=require('mongoose');
// const userSchema=new mongoose.Schema({
//     name:String,
//     email:String,
//     address:String,
//     pincode:String,
//     phone:String
// });

// const User=mongoose.model("User",userSchema);
// module.exports=User;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 6
    },
    phone: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;

