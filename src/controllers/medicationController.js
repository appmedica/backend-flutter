const Medication = require('../models/medication');

const getMedications = async (req, res) => {
    try {
        const medications = await Medication.find();
        res.json(medications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getMedications };

