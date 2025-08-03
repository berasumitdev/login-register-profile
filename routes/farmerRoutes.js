const express = require('express');
const router = express.Router();
const {registerFarmer,getFarmers}=require('../controllers/farmerController')
const { protect } = require('../middlewares/authMiddleware');

router.post('/enroll',protect, registerFarmer);
router.get('/fetch', protect,getFarmers);

module.exports = router;