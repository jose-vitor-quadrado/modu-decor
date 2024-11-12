const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const products = require("./data/Products");
const databaseSeeder = require("./databaseSeeder");
const userRoute = require("./routes/User");
const productRoute = require("./routes/Product");
const orderRoute = require("./routes/Order");

const app = express();

dotenv.config();

const PORT = process.env.PORT;

// api product test route
// app.get("/api/products", (req, res) => {
//   res.json(products);
// });
// app.get("/api/products/:id", (req, res) => {
//   const product = products.find((product) => product.id === req.params.id);
//   res.json(product);
// });

mongoose.connect(process.env.MONGOOSEDB_URL)
  .then(() => console.log("db connected"))
  .then((err) => {
    err;
  });

app.use(express.json());

app.use("/api/seed", databaseSeeder);

app.use("/api/users", userRoute);

app.use("/api/products", productRoute);

app.use("/api/orders", orderRoute);

app.listen(PORT || 9000, () => {
  console.log(`server listening on port ${PORT}`);
});