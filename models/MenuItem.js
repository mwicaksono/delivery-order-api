const db = require('../data/database');

class MenuItem {
    constructor(restaurantId, name, price, description, useYn) {
        this.restaurantId = restaurantId;
        this.name = name;
        this.price = price;
        this.description = description;
        this.useYn = useYn;
    }

    async getLatestMenuId() {
        const result = await db.getDb().collection('menuItems').findOne({ restaurantId: this.restaurantId }, { sort: { menuId: -1 } })
            .then((latestMenuId) => {
                let nextMenuId;
                if (!latestMenuId) {
                    nextMenuId = 'MENU001';
                } else {
                    const latestMenuIdId = latestMenuId.menuId
                    const numericPart = parseInt(latestMenuIdId.substring(4)) + 1;
                    nextMenuId = 'MENU' + numericPart.toString().padStart(3, '0');
                }
                return nextMenuId;
            })

        return result;

    }

    getMenuItems(restaurantId) {
        return db.getDb().collection('menuItems').find({ restaurantId }).toArray();
    }

    getMenuItem(restaurantId, menuId) {
        return db.getDb().collection('menuItems').findOne({ restaurantId, menuId });
    }

    async save() {
        const menuId = await this.getLatestMenuId()
        const result = await db.getDb().collection('menuItems').insertOne({
            restaurantId: this.restaurantId,
            menuId: menuId,
            name: this.name,
            price: this.price,
            description: this.description,
            useYn: this.useYn
        });
        return {
            restaurantId: this.restaurantId,
            menuId: menuId,
            result
        };
    }
}

module.exports = MenuItem;