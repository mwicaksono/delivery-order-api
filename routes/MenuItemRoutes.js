const express = require('express');
const router = express.Router();
const MenuItemController = require('../controllers/MenuItemController');

router.get('/menuItem/:id', MenuItemController.getMenuItems);
router.get('/menuItem', MenuItemController.getMenuItem);

router.post('/menuItem', MenuItemController.save);
module.exports = router;