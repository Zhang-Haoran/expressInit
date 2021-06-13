const jwt = require("jsonwebtoken");

const secret = "secret";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNCwiaWF0IjoxNjIzNTUwODQxLCJleHAiOjE2MjM2MzcyNDF9.pv4N5hGxgW7t4-lNUirvHYJIVLLDixFehpYNKglAsyk";
const valid = jwt.verify(token, secret);

console.log(valid);
