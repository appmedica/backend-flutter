const Subscription = require('../models/subscription');

const subscribe = async (req, res) => {
    const { userId, subscriptionType, paymentStatus } = req.body;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + (subscriptionType === 'annual' ? 12 : 1));

    try {
        const existingSubscription = await Subscription.findOne({ 
            userId, 
            endDate: { $gt: new Date() } 
        });

        if (existingSubscription) {
            return res.status(400).json({ message: 'User already has an active subscription' });
        }

        await Subscription.create({
            userId,
            subscriptionType,
            startDate,
            endDate,
            paymentStatus
        });

        res.status(201).json({ message: 'Subscription successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSubscriptionStatus = async (req, res) => {
    const { userId } = req.params;

    try {
        const subscription = await Subscription.findOne({ 
            userId, 
            endDate: { $gt: new Date() } 
        });

        if (!subscription) {
            return res.json({ active: false, message: 'No active subscription' });
        }

        res.json({ active: true, subscription });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { subscribe, getSubscriptionStatus };
