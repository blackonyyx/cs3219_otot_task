// categoryModel.js

const mongoose = require('mongoose');

// Setup Schema
const Schema = mongoose.Schema;

const categoryTestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
});

const CategoryTest = module.exports = mongoose.model('categoryTest', categoryTestSchema);

