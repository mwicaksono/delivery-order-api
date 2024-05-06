const db = require('../data/database');

class MasterRestaurant {
    constructor(restaurantId = null, name = null, address = null, phoneNumber = null, useYn = null) {
        this.restaurantId = restaurantId;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.useYn = useYn;
    }

    getRestaurants() {
        return db.getDb().collection('masterRestaurant').find().toArray();
    }

    getRestaurantById(restaurantId) {
        return db.getDb().collection('masterRestaurant').findOne({ restaurantId });
    }
}

module.exports = MasterRestaurant