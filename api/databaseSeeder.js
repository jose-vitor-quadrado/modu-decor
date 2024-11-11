const router = require("express").Router();
const AsyncHandler = require("express-async-handler");
const User = require("./models/User");
const users = require("./data/Users");
const Product = require("./models/Product");
const products = require("./data/Products");

router.post("/users", AsyncHandler(
  async (req, res) => {
    await User.deleteMany({});
    const UserSeeder = await User.insertMany(users);
    res.send({ UserSeeder });
  }
));

router.post("/products", AsyncHandler(
  async (req, res) => {
    await Product.deleteMany({});
    const ProductSeeder = await Product.insertMany(products);
    res.send({ ProductSeeder });
  }
));

module.exports = router;