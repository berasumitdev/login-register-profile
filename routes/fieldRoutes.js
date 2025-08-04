const express = require('express');
const router = express.Router();
const {createField,getFieldsByFarmer,getAllFields, bulkCreate}=require('../controllers/fieldController')
const { protect } = require('../middlewares/authMiddleware');


router.post('/create', protect,createField);
router.post('/bulk', bulkCreate)
router.get('/all', protect,getAllFields);
router.get('/:farmerId', protect,getFieldsByFarmer);


module.exports = router;