const validator = require('validator');
const MenuItemModel = require('../models/MenuItem');

async function getMenuItems(req, res) {
    try {
        const restaurantId = req.params.id;
        const MenuItems = new MenuItemModel();
        const menuItemsData = await MenuItems.getMenuItems(restaurantId);

        if (!menuItemsData) {
            return res.status(404).json({
                message: "Menu Items not found"
            });
        }

        return res.status(200).json({
            result: menuItemsData
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error
        })
    }
}

async function getMenuItem(req, res) {
    try {
        const restaurantId = req.body.restaurantId;
        const menuId = req.body.menuId;
        const MenuItems = new MenuItemModel();
        const menuItemData = await MenuItems.getMenuItem(restaurantId, menuId);

        if (!menuItemData) {
            return res.status(404).json({
                message: 'Menu Item not found'
            });
        }

        return res.status(200).json({
            result: menuItemData
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error
        })
    }
}

module.exports = {
    getMenuItems, getMenuItem
}