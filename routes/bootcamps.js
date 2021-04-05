const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");
const courseRoute = require("./courses");

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controller/bootcamps");

//Re-route into other resource router
router.use("/:bootcampId/courses", courseRoute);

router.route("/").get(getBootcamps).post(protect, createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

module.exports = router;
