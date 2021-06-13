const User = require("../model/user");
const { generateToken } = require("../utils/jwt");

async function addUser(req, res) {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json("User already exist");
  }
  const user = new User({ username, password });
  await user.save();
  const token = generateToken({ id: user._id });
  return res.status(201).json({ token, username });
}
module.exports = { addUser };
