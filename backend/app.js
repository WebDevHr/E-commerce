const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

const postsRoute = require("./Routes/posts");
app.use("/posts", postsRoute);

const eventsRoute = require("./Routes/events");
app.use("/events", eventsRoute);

const productsRoute = require("./Routes/products");
app.use("/products", productsRoute);

const authRoute = require("./Routes/authentication");
app.use("/authentication", authRoute);

const searchRoute = require("./Routes/search");
app.use("/search", searchRoute);

app.get("/test", async (req, res) => {
  try {
    const categories = await Product.find();
    res.json(categories);
  } catch (err) {
    res.json({ message: err });
  }
});

const port = process.env.PORT || 8082;
const start = async () => {
  try {
    await mongoose.connect(process.env.Connection_DB);
    app.listen(port, () => console.log("Server started"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
