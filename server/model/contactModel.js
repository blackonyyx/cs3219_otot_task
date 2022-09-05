// contactModel.js

const mongoose = require('mongoose');

// Setup Schema
const Schema = mongoose.Schema;

const  contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
    create_date: {
        type: Date,
        default: Date.now
    }
})

// Export contacts model
const Contact = module.exports = mongoose.model('contact', contactSchema);

module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
}

