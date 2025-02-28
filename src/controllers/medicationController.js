const pool = require('../config/database');

// Controlador para obtener medicamentos
const getMedications = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM medications');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getMedications };
