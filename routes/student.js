const express = require("express");
const students = require("../controller/student");
const router = express.Router();
router.get("/", students.getAllStudents);
router.get("/:id", students.getStudentById);
router.put("/:id", students.updateStudentById);
router.delete("/:id", students.deleteStudentById);
router.post("/", students.createStudent);

module.exports = router;
