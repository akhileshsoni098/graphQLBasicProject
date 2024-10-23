const Blog = require("../../model/blogModel");

const resolversBlog = {
  getBlogs: async ({ userId }) => {
    try {
      const getAllBlogs = await Blog.find({ userId: userId }).populate(
        "userId"
      );
      return getAllBlogs;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getBlog: async ({ id, userId }) => {
    try {
      const getSingleBlog = await Blog.findOne({
        _id: id,
        userId: userId,
      }).populate("userId");

      if (!getSingleBlog) {
        return "No blog found";
      }

      return getSingleBlog;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  createBlog: async ({ userId, title, description }) => {
    try {
      const createBlog = await Blog.create({ userId, title, description });
      const populatedBlog = await Blog.findById(createBlog._id).populate("userId");

      return populatedBlog;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  updateBlog: async ({ id, userId, title, description }) => {
    try {
      const updatedBlog = await Blog.findOneAndUpdate(
        { _id: id, userId: userId },
        { title, description },
        { new: true }
      )
      if (!updatedBlog) {
        return "No blog found to update";
      }
      const populatedBlog = await Blog.findById(updatedBlog._id).populate("userId");
      return populatedBlog;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  deleteBlog: async ({ id, userId }) => {
    try {
      const deletedBlog = await Blog.findOneAndDelete({
        _id: id,
        userId: userId,
      });
      if (!deletedBlog) {
        return "No blog found to delete";
      }
      return "Blog deleted successfully";
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

module.exports = resolversBlog;