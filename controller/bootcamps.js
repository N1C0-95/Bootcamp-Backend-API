const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorMessage");

//@desc     Get All bootcamps
//@route    GET /api/bootcamps
//@access   public
exports.getBootcamps = async (req, res, next) => {
  let query = Bootcamp.find();
  const bootcamps = await query;
  //TODO aggiungi filtri per la query
  res.status(200).json(bootcamps);
};

//@desc     Get bootcamp by ID
//@route    GET /api/bootcamps/:id
//@access   public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp con id ${req.params.id} non trovato`, 404)
      );
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    next(
      new ErrorResponse(`Bootcamp con id ${req.params.id} non trovato`, 404)
    );
  }
};
//@desc     Create a new bootcamp
//@route    POST /api/bootcamps/
//@access   private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};
//@desc     Update bootcamp by ID
//@route    PUT /api/bootcamps/:id
//@access   private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    next(
      new ErrorResponse(`Bootcamp con id ${req.params.id} non trovato`, 404)
    );
  }
};
//@desc     Delete bootcamp by ID
//@route    DELETE /api/bootcamps/:id
//@access   private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    bootcamp.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
