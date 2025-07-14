const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getProfile } = require('../controllers/profileController');

router.get('/me', protect, getProfile);

module.exports = router;