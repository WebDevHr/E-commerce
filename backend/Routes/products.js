const { query } = require("express");
const express = require("express");
const { Product } = require("../models/Product");
const router = express.Router();

//gets back all the products
router.get("/", async (req, res) => {
  try {
    const total = await Product.count();
    const products = await Product.find()
      .limit(req.query._limit)
      .skip(req.query._limit * (req.query._page - 1));
    res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
    res.setHeader("X-Total-Count", total);
    res.json(products);
  } catch (err) {
    res.json({ message: err });
  }
});

//submits a product
router.post("/products", async (req, res) => {
  const product = new Product({
    id: req.body.id,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
    rating: req.body.rating,
  });
  try {
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await Product.find().distinct("category");
    res.json(categories);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:category", async (req, res) => {
  try {
    const total = await Product.find({ category: req.params.category }).count();
    const products = await Product.find({ category: req.params.category })
      .limit(req.query._limit)
      .skip(req.query._limit * (req.query._page - 1));
    res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
    res.setHeader("X-Total-Count", total);
    res.json(products);
  } catch (err) {
    res.json({ message: err });
  }
});

//specific product
router.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    res.json(product);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
