const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const courseRouter = require("./routes/course");
const studentRouter = require("./routes/student");
const db = require("./utils/db");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/students", studentRouter);
db.connectToDB();
module.exports = app;
