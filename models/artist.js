const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },

  age: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Artist", artistSchema);
