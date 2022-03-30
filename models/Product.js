
const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;