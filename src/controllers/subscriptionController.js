const pool = require('../config/database');

// Controlador para gestionar suscripciones y pagos
const subscribe = async (req, res) => {
    const { userId, subscriptionType, paymentStatus } = req.body;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + (subscriptionType === 'annual' ? 12 : 1));

    try {
        // Verificar si el usuario ya tiene una suscripción activa
        const existingSubscription = await pool.query(
            'SELECT * FROM subscriptions WHERE user_id = $1 AND end_date > NOW()',
            [userId]
        );

        if (existingSubscription.rows.length > 0) {
            return res.status(400).json({ message: 'User already has an active subscription' });
        }

        // Insertar la nueva suscripción en la base de datos
        await pool.query(
            'INSERT INTO subscriptions (user_id, type, start_date, end_date, payment_status) VALUES ($1, $2, $3, $4, $5)',
            [userId, subscriptionType, startDate, endDate, paymentStatus]
        );

        res.status(201).json({ message: 'Subscription successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener estado de suscripción del usuario
const getSubscriptionStatus = async (req, res) => {
    const { userId } = req.params;

    try {
        const subscription = await pool.query(
            'SELECT * FROM subscriptions WHERE user_id = $1 AND end_date > NOW()',
            [userId]
        );

        if (subscription.rows.length === 0) {
            return res.json({ active: false, message: 'No active subscription' });
        }

        res.json({ active: true, subscription: subscription.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { subscribe, getSubscriptionStatus };
