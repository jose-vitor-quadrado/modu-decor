const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT || 9000, () => {
  console.log("server listening on port 9000")
});