console.log("App Started");

const express = require("express");
require("./config/db");

const cors = require("cors");

require("dotenv").config({
  quiet: true
});


const app = express();

app.use(cors());
app.use(express.json());

const orderRoutes = require("./routes/orderRoutes");

app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("3PL Order Management API Running");
});

const PORT =  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});