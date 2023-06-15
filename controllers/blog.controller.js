const { BlogModel } = require("../model/blog.model");

const deleteBlog = async (req, res) => {
    const blogID = req.params.blogID;
    console.log({blogID})
    try {
        const deleteBlog = await BlogModel.findByIdAndDelete({_id : blogID});
        if(!deleteBlog){
            return res.status(400).send({"msg" : "Blog not found"});
        }
        res.status(200).send({deleteBlog});
    } catch (error) {
        res.status(400).send({"msg" : error.message});
    }
}

const postBlog = async (req, res) => {
  const payload = req.body;
  payload.date = Date.now();
  try {
    const newBlog = new BlogModel({ ...payload });
    await newBlog.save();
    res.status(200).send(newBlog);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

const getBlogs = async (req, res) => {
  //   console.log(req.body);
  const { page = 1, limit = 2, title, category, sort, order } = req.query;
  const filters = {};
  if (title) {
    filters.title = { $regex: title, $options: "i" };
  }
  if (category) {
    filters.category = category;
  }
  const sortOptions = {};
  if (sort) {
    sortOptions[sort] = order === "desc" ? -1 : 1;
  }
  console.log(filters);

  try {
    const blogs = await BlogModel.find(filters)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).send({ blogs });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

module.exports = { getBlogs, postBlog, deleteBlog };
