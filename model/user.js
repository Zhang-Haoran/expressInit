const mongoose = require("mongoose");
const Joi = require("Joi");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const model = mongoose.model("User", schema);
module.exports = model;