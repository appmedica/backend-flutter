const express = require('express');
const { subscribe, getSubscriptionStatus } = require('../controllers/subscriptionController.js');

const router = express.Router();

router.post('/subscribe', subscribe);
router.get('/status/:userId', getSubscriptionStatus);

module.exports = router;
