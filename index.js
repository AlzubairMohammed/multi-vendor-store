const express = require('express');
const app = express();
require('dotenv').config();
const { sequelize } = require("./models");
const auth = require('./routes/auth');
const categories = require('./routes/categories');
const prodcuts = require('./routes/products');
const subCategories = require('./routes/subCategories');
const users = require('./routes/users');
var path = require('path');



app.use(express.json());

const cors = require('cors');
app.use(
  cors({
    origin: "*",
  })
);

const db = require('./models/');


const URL = process.env.ROUTES_URL;
app.use(`${URL}/auth/`, auth);
app.use(`${URL}/categories/`, categories);
app.use(`${URL}/products/`, prodcuts);
app.use(`${URL}/subCategories/`, subCategories);
app.use(`${URL}/users/`, users);

//this just for test
app.get('/', function(req, res) {
  res.sendFile(path.resolve('test.html'));
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  console.log(`app running at ${PORT}`);
  await sequelize.authenticate();
  console.log("Database connected ...");

})


