const User = require("../model/user");
const { generateToken } = require("../utils/jwt");

async function login(req, res) {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json("username not found");
  }
  if (user.password !== password) {
    return res.status(401).json("Invalid password");
  }
  const token = generateToken({ id: user._id });
  return res.json({ token, username });
}
module.exports = { login };
