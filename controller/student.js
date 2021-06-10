const Student = require("../model/student");
async function getAllStudents(req, res) {
  const courses = await Student.find().exec();
  res.json(courses);
}

async function getStudentById(req, res) {
  const { id } = req.params;
  const student = await Student.findById(id);
  if (!student) {
    return res.sendStatus(404);
  }
  return res.json(student);
}

async function updateStudentById(req, res) {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  const student = await Student.findByIdAndUpdate(
    id,
    { firstName, lastName, email },
    { new: true }
  ); //返回更新之后的结果 需要加{new:true}
  if (!student) {
    return res.sendStatus(404);
  }
  return res.json(student);
}

async function deleteStudentById(req, res) {
  const { id } = req.params;
  const student = await Student.findByIdAndDelete(id);
  //如果是null
  if (!student) {
    return res.sendStatus(404);
  }
  //如果有值，表示删掉
  return res.json(student);
}

async function createStudent(req, res, next) {
  const { code, firstName, lastName, email } = req.body;
  const student = new Student({ _id: code, firstName, lastName, email });
  //第一种写法
  try {
    await student.save(); //.save()在update函数里，可以换成findByIdAndUpdate
  } catch (e) {
    next(e); //传入errorhandler
  }
  return res.status(201).json(student);

  //第二种写法
  // student.save((error, result) => {
  //   if (error) {
  //     return next(error);
  //   }
  //   return res.status(201).json(student);
  // });

  //第三种写法
  // student
  //   .save()
  //   .then((result) => {
  //     res.status(201).json(result);
  //   })
  //   .catch((error) => {
  //     next(error);
  //   });
}

module.exports = {
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  createStudent,
};
