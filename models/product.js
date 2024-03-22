const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image:{
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Product', productSchema);
