const validator = require('validator');
const RestaurantModel = require('../models/Restaurant');

async function getRestaurants(req, res) {
    const Restaurant = new RestaurantModel();
    const restaurants = await Restaurant.getRestaurants();
    if (restaurants.length === 0) {
        return res.status(404).json({
            message: "Restaurants not found"
        });
    }

    return res.status(200).json({
        result: restaurants
    });
}

async function getRestaurantById(req, res) {
    try {
        const restaurantId = req.params.id;

        if (!restaurantId || restaurantId.trim() === '') {
            return res.status(400).json({
                message: "Restaurant ID is required."
            });
        }

        const Restaurant = new RestaurantModel();
        const restaurantData = await Restaurant.getRestaurantById(restaurantId);

        if (!restaurantData) {
            return res.status(404).json({
                message: "Restaurant not found."
            });
        }

        return res.status(200).json({
            result: restaurantData
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

async function save(req, res) {

    const name = req.body.name;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const useYn = req.body.useYn;

    if (!name ||
        !address ||
        !phoneNumber || !validator.isNumeric(phoneNumber) ||
        !useYn
    ) {
        return res.status(400).json({
            message: 'Please check input!'
        });
    }

    const Restaurant = new RestaurantModel(
        null,
        name,
        address,
        phoneNumber,
        useYn
    );
    let result = null;
    try {
        const restaurantData = await Restaurant.save();
        result = restaurantData;
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }

    return res.status(200).json({
        restaurantId: result.restaurantId,
        message: 'Restaurant data successfully saved.',
        result: result
    });
}

async function destroy(req, res) {
    const restaurantId = req.body.restaurantId;

    const Restaurant = new RestaurantModel(restaurantId);
    if (!restaurantId || restaurantId.trim() === '') {
        return res.status(400).json({
            message: "Restaurant ID is required."
        });
    }

    let result = null;
    try {
        const restaurantData = await Restaurant.destroy();
        result = restaurantData;
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }

    if (!result.status) {
        return res.status(404).json({
            result
        });
    }

    return res.status(200).json({
        restaurantId: result.restaurantId,
        message: "Restaurant data successfully deleted.",
        result: result,
    });
}

async function update(req, res) {
    const restaurantId = req.body.restaurantId;
    const name = req.body.name;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const useYn = req.body.useYn;

    if (!restaurantId ||
        !name ||
        !address ||
        !phoneNumber || !validator.isNumeric(phoneNumber) ||
        !useYn
    ) {
        return res.status(404).json({
            message: 'Please check input!'
        });
    }



    const Restaurant = new RestaurantModel(
        restaurantId,
        name,
        address,
        phoneNumber,
        useYn
    );

    const checkRestaurant = await Restaurant.getRestaurantById(restaurantId);

    if (!checkRestaurant) {
        return res.status(404).json({
            message: 'Restaurant ID Not found!'
        });
    }

    let result = null;
    try {
        const restaurantData = await Restaurant.update();
        result = restaurantData;
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }

    return res.status(200).json({
        result: result
    });
}

module.exports = {
    getRestaurants, getRestaurantById, save, destroy, update
}