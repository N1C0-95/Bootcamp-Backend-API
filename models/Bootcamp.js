const mongoose = require("mongoose");

const BootcampSchema = mongoose.Schema({
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
  cost: {
    type: Number,
    min: [0],
  },
  email: {
    type: String,
    match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/],
    required: [true, "Aggiungi un email di contatto"],
  },
});

module.exports = mongoose.model("Bootcamp", BootcampSchema);
