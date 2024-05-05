const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/RestaurantController');

router.get('/restaurant', RestaurantController.index);
router.get('/restaurant/insert', RestaurantController.insert);

module.exports = router;