const express = require("express");
const { Product } = require("../models/Product");
const router = express.Router();

//gets back all the products
router.get("/", async (req, res) => {
  try {
    const searchExpression = JSON.parse(req.query.q).searchExpression;

    const products = await Product.find({
      $or: [
        { title: { $regex: searchExpression, $options: "i" } },
        { description: { $regex: searchExpression, $options: "i" } },
      ],
    }).limit(8);
    res.json(products);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
