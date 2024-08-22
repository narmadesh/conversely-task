const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);
router.post("/", async (req, res) => {
  try {
    res.cookie("token", "").json({message:"Logged out successfully"});
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

module.exports = router;
