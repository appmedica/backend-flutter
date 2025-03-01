const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subscriptionType: { type: String, enum: ['monthly', 'annual'], required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
