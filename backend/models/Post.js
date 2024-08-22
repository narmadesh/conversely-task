const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PostSchema = Schema(
  {
    title: String,
    content: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const PostModel = model("Post", PostSchema);
module.exports = PostModel;
