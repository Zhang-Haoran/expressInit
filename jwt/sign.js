const jwt = require("jsonwebtoken");

const secret = "secret";
const payload = {
  id: 1234,
};
const token = jwt.sign(payload, secret, { expiresIn: "1d" });

console.log(token);
