const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const restaurantRoutes = require('./routes/RestaurantRoutes');

app.use(bodyParser.json());
app.use(restaurantRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running on port: ${port}`);
})
