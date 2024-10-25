const Blog = require("../../model/blogModel");
const User = require("../../model/userModel");

const resolversBlog = {
  Query: {
    // auth required
    myBlogs: async (parent, args, context) => {
      try {
        if (!context.user || !context.user._id) {
          throw new Error("User not authenticated");
        }
        const blogs = await Blog.find({ userId: context.user._id }).populate(
          "userId"
        );
        return blogs;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    getBlog: async (parent, args, context) => {
      try {
        if (!context.user || !context.user._id) {
          throw new Error("User not authenticated");
        }
        const blog = await Blog.findById(args.id).populate("userId");
        if (!blog) {
          throw new Error("Blog not found");
        }
        return blog;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    getBlogs: async (parent, args) => {
      try {
        const blogs = await Blog.find().populate("userId");
        return blogs;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },

  Mutation: {
    createBlog: async (parent, args, context) => {
      try {
        if (!context.user || !context.user._id) {
          throw new Error("User not authenticated");
        }
        const newBlog = await Blog.create({
          ...args,
          userId: context.user._id,
        });

        const user = await User.findById(newBlog.userId);

        return {
          id: newBlog._id,
          title: newBlog.title,
          description: newBlog.description,
          userId: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        };
      } catch (err) {
        throw new Error(err.message);
      }
    },

    updateBlog: async (parent, args, context) => {
      try {
        if (!context.user || !context.user._id) {
          throw new Error("User not authenticated");
        }
        const updatedBlog = await Blog.findOneAndUpdate(
          { _id: args.id, userId: context.user._id },
          { ...args },
          { new: true }
        ).populate("userId");
        if (!updatedBlog) {
          throw new Error("Blog not found");
        }
        return updatedBlog;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    deleteBlog: async (parent, args, context) => {
      try {
        if (!context.user || !context.user._id) {
          throw new Error("User not authenticated");
        }
        const deletedBlog = await Blog.findOneAndDelete({
          _id: args.id,
          userId: context.user._id,
        });
        if (!deletedBlog) {
          throw new Error("Blog not found");
        }
        return "Blog deleted successfully";
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};
module.exports = resolversBlog;
