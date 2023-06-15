const express = require("express");
const { getBlogs, postBlog, deleteBlog } = require("../controllers/blog.controller");

const blogRoute = express.Router();

blogRoute.get("/", getBlogs);
blogRoute.post("/", postBlog);
blogRoute.delete("/:blogID", deleteBlog);

module.exports = { blogRoute };
