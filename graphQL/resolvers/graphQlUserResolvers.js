const User = require("../../model/userModel");

const resolversUser = {

  getUser: async ({ id, name, email }) => {
    try {
      const filter = {};

      if (id) {
        filter._id = id;
      }

      if (name) {
        filter.name = name;
      }

      if (email) {
        filter.email = email;
      }

      if (Object.keys(filter).length === 0) {
        throw new Error(
          "At least one of 'id', 'name', or 'email' must be provided."
        );
      }

      const user = await User.findOne(filter); // Removed the spread operator
      return user;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  getUsers: async () => {
    try {
      const users = await User.find();
      return users;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  createUser: async ({name, email, password}) => {
    try {
      if (!name || !email || !password) {
        throw new Error("All fields are required.");
      }

      const check = await User.findOne({ email: email });
      if (check) {
        throw new Error("Email already exists.");
      }

      const data = { name, email, password };
      const user = await User.create(data);
      return user;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  updateUser: async ({id, name}) => {
    try {
      if (!id) {
        throw new Error("ID is required.");
      }
      const user = await User.findByIdAndUpdate(id, { name }, { new: true });
      return user;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  deleteUser: async ({id}) => {
    try {
      if (!id) {
        throw new Error("ID is required.");
      }
      const user = await User.findByIdAndDelete(id);
      return user;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

module.exports = resolversUser;
