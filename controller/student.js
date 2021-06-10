const Student = require("../model/student");
const Course = require("../model/course");
async function getAllStudents(req, res) {
  const courses = await Student.find().exec();
  res.json(courses);
}

async function getStudentById(req, res) {
  const { id } = req.params;
  const student = await Student.findById(id).populate("courses"); //populate 把相关联的课程信息也取出
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
  await Course.updateMany(
    //搜索条件
    {
      students: student._id, //查找student里面所有course为course id的 student
    },
    {
      $pull: {
        students: student._id, //把student中的那个课程删除掉
      },
    }
  );
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

async function addStudentToCourse(req, res) {
  //find student => get student id
  //find course => get course code
  const { id, code } = req.params;
  const student = await Student.findById(id);
  const course = await Course.findById(code); //需要导入Course model
  //check course or student exist
  if (!student || !course) {
    return res.sendStatus(404);
  }
  //check student already enrolled
  // if(student.courses.includes(course._id))

  //add student to course
  student.courses.addToSet(course._id); //如果重复 不会重复添加
  course.students.addToSet(student._id);
  await student.save();
  await course.save();
  return res.json(student);
}

async function removeStudentFromCourse(req, res) {
  //find student => get student id
  //find course => get course code
  const { id, code } = req.params;
  const student = await Student.findById(id);
  const course = await Course.findById(code); //需要导入Course model
  //check course or student exist
  if (!student || !course) {
    return res.sendStatus(404);
  }
  //check student already enrolled
  // if(student.courses.includes(course._id))

  //add student to course
  student.courses.pull(course._id); //pull把某项从array中取出，有的话取出，没的话不做改动
  course.students.pull(student._id);
  await student.save();
  await course.save();
  return res.json(student);
}

module.exports = {
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  createStudent,
  addStudentToCourse,
  removeStudentFromCourse,
};
