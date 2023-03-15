const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secret = "the_secret_key";

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.json({
        events: events,
      });
    }
  });
});

router.post("/register", async (req, res) => {
  if (req.body) {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: req.body.password,
    });
    try {
      const isUser = await User.find({
        email: req.body.email,
        password: req.body.password,
      }).count();
      if (isUser) {
        res.sendStatus(400);
      } else {
        const savedUser = await user.save();
        const token = jwt.sign({ savedUser }, secret);
        res.json({
          token,
          email: savedUser.email,
        });
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  } else {
    res.sendStatus(400);
  }
});

router.post("/login", async (req, res) => {
  if (req.body) {
    try {
      const isUser = await User.find({
        email: req.body.email,
        password: req.body.password,
      }).count();
      if (!isUser) {
        res.sendStatus(400);
      } else {
        const user = await User.find({
          email: req.body.email,
          password: req.body.password,
        });
        const token = jwt.sign({ user }, secret);
        res.json({
          token,
          email: user.email,
        });
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  } else {
    res.sendStatus(400);
  }
});

// MIDDLEWARE
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(401);
  }
}

module.exports = router;
