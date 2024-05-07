const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./data/database');

const restaurantRoutes = require('./routes/RestaurantRoutes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(restaurantRoutes);

const port = process.env.PORT || 3000;

db.connectToDatabase().then(function () {
    app.listen(port);
    console.log(`server running on http://localhost:${port}/`)
}).catch(function (error) {
    console.log('error: you must connect first');
    console.log(error);
})