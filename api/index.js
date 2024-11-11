const express = require("express");
const dotenv = require("dotenv");
const products = require("./data/Products");
const mongoose = require("mongoose");

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

// connect db
mongoose.connect(process.env.MONGOOSEDB_URL)
  .then(() => console.log("db connected"))
  .then((err) => {
    err;
  });

app.listen(PORT || 9000, () => {
  console.log(`server listening on port ${PORT}`);
});