const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        unique: true
    },
    product_image: {
        type: String,
        required: true
    },
    product_desc: {
        type: String,
        required: true,

    },
    product_rating: {
        type: Number,
        required: true
    },
    product_cost: {
        type: Number,
        required: true
    },
    product_stock: {
        type: Number,
        required: true
    },
    product_dimension: {
        type: String,
        required: true
    },
    product_subimages: {
        type: Array,
        required: true
    },
    product_material: {
        type: String,
        required: true
    },
    color_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Color"
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    created_at: {
        type: Date,
        default: Date.now
    }

})
module.exports = mongoose.model("product", ProductSchema);