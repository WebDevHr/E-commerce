const express = require("express");
const router = express.Router();
const Events = require("../models/Events");

//gets back all the posts
router.get("/", async (req, res) => {
  try {
    const total = await Events.count();
    const posts = await Events.find()
      .limit(req.query._limit)
      .skip(req.query._limit * (req.query._page - 1));
    res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
    res.setHeader("X-Total-Count", total);
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

//submits a post
router.post("/", async (req, res) => {
  const post = new Events({
    id: req.body.id,
    title: req.body.title,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location,
    description: req.body.description,
    category: req.body.category,
    attendees: req.body.attendees,
  });
  try {
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//specific post
router.get("/:postId", async (req, res) => {
  try {
    const post = await Events.findOne({ id: req.params.postId });
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
