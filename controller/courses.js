const Course = require("../model/course");
async function getAllCourses(req, res) {
  const courses = await Course.find().exec();
  res.json(courses);
}

async function getCourseById(req, res) {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) {
    return res.sendStatus(404);
  }
  return res.json(course);
}

async function updateCourseById(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;
  const course = await Course.findByIdAndUpdate(
    id,
    { name, description },
    { new: true }
  ); //返回更新之后的结果 需要加{new:true}
  if (!course) {
    return res.sendStatus(404);
  }
  return res.json(course);
}

async function deleteCourseById(req, res) {
  const { id } = req.params;
  const course = await Course.findByIdAndDelete(id);
  //返回删掉的id
  //   {
  //   description: 'This is a description',
  //   _id: 'FIT2002',
  //   name: 'Project Management',
  //   __v: 0
  // }

  //如果是null
  if (!course) {
    return res.sendStatus(404);
  }
  //如果有值，表示删掉
  return res.sendStatus(204);
}

async function createCourse(req, res) {
  const { code, name, description } = req.body;
  const course = new Course({ _id: code, name, description });
  await course.save();
  return res.status(201).json(course);
}

module.exports = {
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  createCourse,
};
