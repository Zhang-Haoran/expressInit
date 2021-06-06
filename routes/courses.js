const express = require("express");
const courses = require("../controller/courses");
const router = express.Router();
router.get("/", courses.getAllCourses);
router.get("/:id", courses.getCourseById);
router.put("/:id", courses.updateCourseById);
router.delete("/:id", courses.deleteCourseById);
router.post("/", courses.createCourse);

module.exports = router;
