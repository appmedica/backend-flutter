const express = require('express');
const { getMedications } = require('../controllers/medicationController');

const router = express.Router();

router.get('/medications', getMedications);

module.exports = router;
