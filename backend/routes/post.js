const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);
router.post("/", async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const postDoc = await Post.create({
      title,
      content,
      author: userId,
    });

    res.status(200).json(postDoc);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

router.put("/", async (req, res) => {
  try {
    const { id, title, content, userId } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(userId);

    if (!isAuthor) {
      return res.status(400).json({ message: "You are not the author" });
    }

    await postDoc.updateOne({
      title,
      content,
    });

    res.status(200).json(postDoc);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

router.get("/", async (req, res) => {
  try {
    res
      .status(200)
      .json(
        await Post.find()
          .populate("author", ["username"])
          .sort({ createdAt: -1 })
          .limit(20)
      );
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate("author", ["username"]);
    res.status(200).json(postDoc);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});
module.exports = router;
