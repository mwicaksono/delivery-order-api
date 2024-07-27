const db = require('../data/database');

class MenuItem {
    constructor(restaurantId, name, price, description, useYn) {
        this.restaurantId = restaurantId;
        this.name = name;
        this.price = price;
        this.description = description;
        this.useYn = useYn;
    }


    getMenuItems(restaurantId) {
        return db.getDb().collection('menuItems').find({ restaurantId }).toArray();
    }

    getMenuItem(restaurantId, menuId) {
        return db.getDb().collection('menuItems').findOne({ restaurantId, menuId });
    }
}

module.exports = MenuItem;