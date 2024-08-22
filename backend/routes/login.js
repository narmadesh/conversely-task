const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
dotenv.config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign(
          { username, id: userDoc._id },
          process.env.secret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json({
              id: userDoc._id,
              username,
            });
          }
        );
      }
      else {
        res.status(400).json({ message: "Wrong credentials" });
      }
    } else {
      res.status(400).json({ message: "Wrong credentials" });
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

module.exports = router;
