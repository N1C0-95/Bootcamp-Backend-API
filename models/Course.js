const mongoose = require("mongoose");
const Bootcamp = require("./Bootcamp");

const CourseSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Aggiungi un nome"],
    maxlenght: [50, "Non puoi usare più di 50 caratteri"],
    unique: true,
  },
  description: {
    type: String,
    maxlenght: [500, "Non puoi usare più di 500 caratteri"],
  },
  levelSkills: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
  },
  bootcampId: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    require: [true, "Aggiungi il bootcamp"],
  },
});

module.exports = mongoose.model("Course", CourseSchema);
