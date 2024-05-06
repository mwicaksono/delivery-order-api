const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/RestaurantController');

router.get('/restaurant', RestaurantController.getRestaurants);
router.get('/restaurant/:id', RestaurantController.getRestaurantById);

module.exports = router;