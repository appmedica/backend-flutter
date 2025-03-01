const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    dosage: { type: String },
    price: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('medication', medicationSchema);
