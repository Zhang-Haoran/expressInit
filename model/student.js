const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
schema.virtual("code").get(function () {
  return this._id;
});
const model = mongoose.model("Student", schema);
module.exports = model;
