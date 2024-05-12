const RestaurantModel = require('../models/Restaurant');
async function getRestaurants(req, res) {
    const Restaurant = new RestaurantModel();
    const restaurants = await Restaurant.getRestaurants()
    return res.json({
        "result": restaurants
    });
}

async function getRestaurantById(req, res) {
    try {
        const restaurantId = req.params.id;
        const Restaurant = new RestaurantModel();
        const restaurantData = await Restaurant.getRestaurantById(restaurantId);

        if (!restaurantData) {
            return res.status(404).json({
                message: "Restaurant not found"
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
    const Restaurant = new RestaurantModel(
        null,
        req.body.name,
        req.body.address,
        req.body.phoneNumber,
        req.body.useYn
    );
    let result = null;
    try {
        const restaurantData = await Restaurant.save();
        result = restaurantData;
    } catch (error) {
        res.send(error)
    }

    return res.status(200).json({
        result: result
    });
}

async function destroy(req, res) {
    const Restaurant = new RestaurantModel(req.body.restaurantId);
    let result = null;
    try {
        const restaurantData = await masterRestaurant.destroy();
        result = restaurantData;
    } catch (error) {
        res.send(error)
    }

    return res.status(200).json({
        result: result
    });
}

async function update(req, res) {
    const Restaurant = new RestaurantModel(
        req.body.restaurantId,
        req.body.name,
        req.body.address,
        req.body.phoneNumber,
        req.body.useYn
    );

    let result = null;
    try {
        const restaurantData = await masterRestaurant.update();
        result = restaurantData;
    } catch (error) {
        res.send(error)
    }

    return res.status(200).json({
        result: result
    });
}

module.exports = {
    getRestaurants, getRestaurantById, save, destroy, update
}