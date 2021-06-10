const mongoose = require("mongoose");

function connectToDB() {
  const db = mongoose.connection;
  db.on("connected", () => {
    console.log("Connected");
  });
  db.on("error", () => {
    console.log(error.message);
    process.exit(1);
  });
  db.on("disconnected", () => {
    console.log("disconnected");
  });
}
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
module.exports = { connectToDB };
