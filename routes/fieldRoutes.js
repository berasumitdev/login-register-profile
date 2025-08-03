const express = require('express');
const router = express.Router();
const {createField,getFieldsByFarmer,getAllFields}=require('../controllers/fieldController')
const { protect } = require('../middlewares/authMiddleware');


router.post('/create', protect,createField);
router.get('/all', protect,getAllFields);
router.get('/:farmerId', protect,getFieldsByFarmer);


module.exports = router;