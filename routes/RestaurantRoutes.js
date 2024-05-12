const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/RestaurantController');

router.get('/restaurant', RestaurantController.getRestaurants);
router.get('/restaurant/:id', RestaurantController.getRestaurantById);

router.post('/restaurant', RestaurantController.save);
router.patch('/restaurant', RestaurantController.update);
router.delete('/restaurant', RestaurantController.destroy);

module.exports = router;