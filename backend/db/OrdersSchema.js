const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    Orderno: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    items: {
        type: Array
    },
    selectaddr: {
        type: Object,

    },
    checkout: {
        type: Boolean,
    },

    // card: {
    //     type: Number,
    //     required: false

    // },

    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("order", OrderSchema);