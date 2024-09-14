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

async function save(req, res) {
    const restaurantId = req.body.restaurantId;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const useYn = req.body.useYn;

    if (!restaurantId ||
        !name ||
        !description ||
        !price ||
        !useYn
    ) {
        return res.status(400).json({
            message: 'Please check input!'
        });
    }

    try {
        const MenuItem = new MenuItemModel(restaurantId, name, price, description, useYn);

        const menuItemData = await MenuItem.save();
        return res.status(200).json({
            result: menuItemData
        });
    } catch (error) {
        console.error("Error saving menu item:", error);

        return res.status(500).json({
            message: 'Failed to save menu item',
            error: error.message || 'Internal Server Error'
        });
    }
}

async function destroy(req, res) {
    const MenuItem = new MenuItemModel();
    const restaurantId = req.body.restaurantId;
    const menuId = req.body.menuId;

    if (!restaurantId ||
        !menuId
    ) {
        return res.status(400).json({
            status: false,
            message: 'Restaurant ID & Menu ID field is required.',
            statusCode: 400
        });
    }

    const menuItemData = await MenuItem.getMenuItem(restaurantId, menuId);

    if (!menuItemData) {
        return res.status(400).json({
            message: 'Menu Not Found'
        });
    }

    let result;
    try {
        const resultDelete = await MenuItem.destroy(restaurantId, menuId);
        result = resultDelete;
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }

    return res.status(200).json({
        status: true,
        result: result
    });

}



module.exports = {
    getMenuItems, getMenuItem, save, destroy
}