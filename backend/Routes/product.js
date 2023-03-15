const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

//specific product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    res.json(product);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
