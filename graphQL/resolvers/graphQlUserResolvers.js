const User = require("../../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const resolversUser = {
  Query: {
    getUser: async (parent, args, context) => {
      try {
        // console.log("Context user:", context.user);
        if (!context.user || !context.user._id) {
          throw new Error("Not authenticated.");
        }

        const user = await User.findById(context.user._id);
        if (!user) {
          throw new Error("User not found.");
        }

        return user;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
  Mutation: {
    createUser: async (parent,{ name, email, password }) => {
      try {
        if (!name || !email || !password) {
          throw new Error("All fields are required.");
        }

        const check = await User.findOne({ email: email });
        if (check) {
          throw new Error("Email already exists.");
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const data = { name, email, password: hashPassword };

        const userSave = await User.create(data);
        const token = jwt.sign({ _id: userSave._id }, process.env.JWT_SECRET_KEY);

        return {
          token,
          user: {
            id: userSave._id,
            role: userSave.role,
            name: userSave.name,
            email: userSave.email,
          },
        };
      } catch (err) {
        throw new Error(err.message);
      }
    },
    logInUser: async (parent,{ email, password }) => {
      if (!email || !password) {
        throw new Error("All fields are required.");
      }

      const userData = await User.findOne({ email });
      if (!userData) {
        throw new Error("User not found.");
      }

      const validUser = await bcrypt.compare(password, userData.password);
      if (!validUser) {
        throw new Error("Invalid credentials.");
      }

      const token = jwt.sign({ _id: userData._id }, process.env.JWT_SECRET_KEY);

      return {
        token,
        user: {
          id: userData._id,
          role: userData.role,
          name: userData.name,
          email: userData.email,
        },
      };
    },
    updateUser: async (parent,{ name },context) => {
      try {

        if (!context.user || !context.user._id) {
          throw new Error("Not authenticated.");
        }
        const user = await User.findByIdAndUpdate(context.user._id, { name }, { new: true });
        return user;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    deleteUser: async (parent,{},context) => {
      try {

        if (!context.user || !context.user._id) {
          throw new Error("Not authenticated.");
        }
        const user = await User.findByIdAndDelete(context.user._id);
        return "User Deleted Successfully.";
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};

module.exports = resolversUser;
