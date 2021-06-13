const jwt = require("jsonwebtoken");

function generateToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1d" });
  return token;
}

function validateToken(token) {
  let decode;
  try {
    decode = jwt.verify(token, process.env.JWT_KEY);
  } catch (e) {
    return null;
  }
  return decode;
}
module.exports = { generateToken, validateToken };
