const express = require("express");
const user = require("../controller/user");
const router = express.Router();
router.post("/", user.addUser);

module.exports = router;
