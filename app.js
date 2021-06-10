const dotenv = require("dotenv").config();
const express = require("express");
require("express-async-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const courseRouter = require("./routes/course");
const studentRouter = require("./routes/student");
const db = require("./utils/db");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/students", studentRouter);

app.use(errorHandler);
db.connectToDB();
module.exports = app;
