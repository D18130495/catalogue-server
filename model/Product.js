// Import required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// product schema
const ProductSchema = new Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    brand: { type: String },
    category: { type: String },
    thumbnail: { type: String },
    images: [{ type: String }],
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now }
})

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;