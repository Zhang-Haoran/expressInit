const dotenv = require("dotenv").config();
const express = require("express");
require("express-async-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const courseRouter = require("./routes/course");
const studentRouter = require("./routes/student");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const db = require("./utils/db");
const errorHandler = require("./middleware/errorHandler");
const authGuard = require("./middleware/authGuard");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/students", authGuard, studentRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

app.use(errorHandler);
db.connectToDB();
module.exports = app;
