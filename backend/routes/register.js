const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/Users");
dotenv.config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);
const salt = bcrypt.genSaltSync(10);
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

module.exports = router;
