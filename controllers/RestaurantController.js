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
        req.body.restaurantId,
        req.body.name,
        req.body.address,
        req.body.phoneNumber,
        req.body.useYn 
    );

    try {
        await masterRestaurant.save();
    } catch (error) {
        res.send(error)
    }

    return res.status(200).json({
        result: 'created'
    });
}

module.exports = {
    getRestaurants, getRestaurantById, save
}