const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//DB Connect
connectDB();

//Route
const bootcamps = require("./routes/bootcamps");
const auth = require("./routes/auth");
const courses = require("./routes/courses");

//App
const app = express();

//Body Parser middleware
app.use(express.json());

//Cookie Parser middleware
app.use(cookieParser());

//Mount Route
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/auth", auth);
app.use("/api/v1/courses", courses);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`server running in ${process.env.NODE_ENV} on port: ${PORT}`)
);
