const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    fullname: {
        type: String,
        max: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    profileImg: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        max: 30,
        default: ""
    },
    birthday: {
        type: String,
        default: "11 - 10 - 2000"
    },
    fauvorite: {
        type: Array,
        default: []
    }
},
    { timestamps: true }
)
module.exports = mongoose.model('User', userSchema);