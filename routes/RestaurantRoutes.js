const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/RestaurantController');

router.get('/restaurant', RestaurantController.getRestaurants);
router.get('/restaurant/:id', RestaurantController.getRestaurantById);

router.post('/restaurant', RestaurantController.save);
router.delete('/restaurant/destroy', RestaurantController.destroy);
router.patch('/restaurant/update', RestaurantController.update);

module.exports = router;