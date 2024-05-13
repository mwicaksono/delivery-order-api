const db = require('../data/database');

class MenuItem {
    constructor(restaurantId, name, price, description, useYn) {
        this.restaurantId = restaurantId;
        this.name = name;
        this.price = price;
        this.description = description;
        this.useYn = useYn;
    }


    getMenuItems() {
        return db.getDb().collection('menuItem').find({ restaurantId: this.restaurantId }).toArray();
    }

    getMenuItemById(restaurantId, menuId) {
        return db.getDb().collection('menuItem').findOne({ restaurantId });
    }
}

module.exports = MenuItem;