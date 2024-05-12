const db = require('../data/database');

class Restaurant {
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

    async getLatestRestaurantId() {
        const result = await db.getDb().collection('masterRestaurant').findOne({}, { sort: { restaurantId: -1 } })
            .then((latestRestaurant) => {
                let nextRestaurantId;
                if (!latestRestaurant) {
                    nextRestaurantId = 'RES001';
                } else {
                    const latestRestaurantId = latestRestaurant.restaurantId
                    const numericPart = parseInt(latestRestaurantId.substring(3));
                    nextRestaurantId = 'RES' + ('000' + (numericPart + 1)).slice(-3);
                }
                return nextRestaurantId;
            })

        return result;

    }

    async save() {
        const restaurantId = await this.getLatestRestaurantId()
        const result = await db.getDb().collection('masterRestaurant').insertOne({
            restaurantId: restaurantId,
            name: this.name,
            address: this.address,
            phoneNumber: this.phoneNumber,
            useYn: this.useYn
        });
        return result;
    }

    async update() {
        const result = await db.getDb().collection('masterRestaurant').updateOne({
            restaurantId: this.restaurantId
        }, {
            $set: {
                name: this.name,
                address: this.address,
                phoneNumber: this.phoneNumber,
                useYn: this.useYn,
            }
        });
        return result;
    }

    async destroy() {
        const result = await db.getDb().collection('masterRestaurant').deleteOne({
            restaurantId: this.restaurantId
        });
        return result;
    }
}

module.exports = Restaurant