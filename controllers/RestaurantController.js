const MasterRestaurant = require('../models/MasterRestaurant');
async function getRestaurants(req, res) {
    const masterRestaurant = new MasterRestaurant();
    const restaurants = await masterRestaurant.getRestaurants()
    return res.json({
        "result": restaurants
    });
}

async function getRestaurantById(req, res) {
    const restaurantId = req.params.id;
    const masterRestaurant = new MasterRestaurant();
    const restaurant = await masterRestaurant.getRestaurantById(restaurantId);

    if (!restaurant) {
        return res.status(404).json({
            message: "Restaurant not found"
        });
    }

    return res.status(200).json({
        result: restaurant
    });
}

async function save(req, res) {
    const masterRestaurant = new MasterRestaurant(
        null,
        req.body.name,
        req.body.address,
        req.body.phoneNumber,
        req.body.useYn
    );
    let result = null;
    try {
        const restaurantData = await masterRestaurant.save();
        result = restaurantData;
    } catch (error) {
        res.send(error)
    }

    return res.status(200).json({
        result: result
    });
}

async function destroy(req, res) {
    const masterRestaurant = new MasterRestaurant(req.body.restaurantId);
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
    const masterRestaurant = new MasterRestaurant(
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