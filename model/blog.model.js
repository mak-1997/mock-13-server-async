const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const blogSchema = mongoose.Schema(
  {
    username: String,
    userID: ObjectId,
    title: String,
    content: String,
    category: String,
    date: String,
    likes: Number,
    comments: [
      {
        username: String,
        content: String,
      },
    ],
  },
  {
    versionKey: false,
  }
);

const BlogModel = mongoose.model("blogs", blogSchema);

module.exports = { BlogModel };
