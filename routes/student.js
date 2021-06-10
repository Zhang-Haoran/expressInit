const express = require("express");
const students = require("../controller/student");
const router = express.Router();
router.get("/", students.getAllStudents);
router.get("/:id", students.getStudentById);
router.put("/:id", students.updateStudentById);
router.delete("/:id", students.deleteStudentById);
router.post("/", students.createStudent);

router.post("/:id/courses/:code", students.addStudentToCourse); //第一个参数是学生id，第二个参数是课程代码
router.delete("/:id/courses/:code", students.removeStudentFromCourse);
module.exports = router;
