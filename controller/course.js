const Course = require("../model/course");
const Joi = require("joi");

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
  return res.json(course);
}

async function createCourse(req, res) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(10).required(),
    code: Joi.string()
      .regex(/^[a-zA-Z0-9]+$/)
      .required(),
    description: Joi.string(),
  });
  const { code, name, description } = await schema.validateAsync(req.body, {
    allowUnknown: true, //允许接受不存在于schema的数据
    stripUnknown: true, //虽然接受不存在数据，但会把他们删掉
    abortEarly: false, //默认为true，有字段不合法就会提前返回。false的话，会把所有字段检测完
  });

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
