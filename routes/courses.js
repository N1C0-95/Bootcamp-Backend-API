const express = require("express");
const { protect } = require("../middleware/auth");

const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controller/courses");

const router = express.Router();

router.route("/").get(getCourses).post(protect, createCourse);

router
  .route("/:id")
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;
