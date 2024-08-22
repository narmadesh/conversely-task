const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);
router.get("/", async (req, res) => {
  try {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) throw err;
      res.status(200).json(info);
    });
  } catch (error) {
    throw error
    res.status(400).json({ message: "Something went wrong" });
  }
});

module.exports = router;
