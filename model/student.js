const mongoose = require("mongoose");
const Joi = require("Joi");

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
    validator: {
      validator: (email) => {
        const validation = Joi.string().email().validate(email);
        const { error } = validation;
        //如果error有值则验证失败
        if (error) {
          return false;
        } else {
          return true;
        }
      },
      msg: "Invalid email format",
    },
  },
});
schema.virtual("code").get(function () {
  return this._id;
});
const model = mongoose.model("Student", schema);
module.exports = model;
