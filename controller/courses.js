const ErrorResponse = require("../utils/errorMessage");
const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");

//@desc     Get all courses
//@route    GET /api/v1/bootcamps/:bootcampId/courses
//@access   public
exports.getCourses = async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    next(new ErrorResponse("Bootcamp ID sbagliato", 404));
  }

  try {
    const courses = await query;
    res.status(200).json({ status: true, data: courses });
  } catch (err) {
    next(err);
  }
};

//@desc     Get single courses
//@route    GET /api/v1/courses/:id
//@access   public
exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404));
    }

    res.status(200).json({ status: true, data: course });
  } catch (err) {
    next(err);
  }
};

//@desc     Create a new course
//@route    POST /api/v1/bootcamps/:bootcampId/courses
//@access   Private

exports.createCourse = async (req, res, next) => {
  try {
    console.log("bootcampID value:", req.body.bootcampId);

    const bootcamp = await Bootcamp.findById(req.body.bootcampId);

    if (!bootcamp) {
      next(
        new ErrorResponse(
          `No bootcamp with the id of ${req.body.bootcampId}`,
          404
        )
      );
    }

    const course = await Course.create(req.body);

    res.status(201).json({
      succes: true,
      data: course,
    });
  } catch (err) {
    next(err);
  }
};

//@desc     Update  course
//@route    POST /api/v1/courses/:id
//@access   Private

exports.updateCourse = async (req, res, next) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404));
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      succes: true,
      data: course,
    });
  } catch (err) {
    next(err);
  }
};

//@desc     Delete  course
//@route    DELETE /api/v1/courses/:id
//@access   Private

exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      next(
        new ErrorResponse(`No bootcamp with the id of ${req.params.id}`, 404)
      );
    }

    await course.remove();

    res.status(200).json({
      succes: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
