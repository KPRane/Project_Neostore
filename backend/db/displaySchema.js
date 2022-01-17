const mongoose = require('mongoose');
const displaySchema = new mongoose.Schema({
    pid: {
        type: Number,
        unique: true

    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    prating: {
        type: Number,
        required: true
    },
    producer: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    dimension: {
        type: Number,
        required: true
    },
    material: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("display", displaySchema);