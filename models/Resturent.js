const mongoose = require("mongoose");

const resturentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    products: [
        {
            cat: {
                type: String,
                unique: true,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            details: {
                type: String,
            },
            type: {
                type: String,
            },
            img: {
                type: String,
            },
        }
    ],
    type: {
        type: Array,
        default: []
    },
    available: {
        type: Array,
        default: []
    },
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],

    },
    position: {
        lat: {
            type: String,
            default: 0
        },
        lng: {
            type: String,
            default: 0
        },
    },

},
    { timestamps: true }
)
module.exports = mongoose.model('Resturent', resturentSchema);