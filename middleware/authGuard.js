const { validateToken } = require("../utils/jwt");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    //{error:"msg"}
    return res.sendStatus(401);
  }
  const contentArray = authHeader.split(" ");
  if (contentArray.length !== 2 || contentArray[0] != "Bearer") {
    return res.sendStatus(401);
  }

  const decode = validateToken(contentArray[1]);
  if (!decode) {
    return res.sendStatus(401);
  }
  req.user = decode;
  next();
};
