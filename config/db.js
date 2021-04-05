const mongoose = require("mongoose");

const connectDB = async () => {
  const connection = await mongoose.connect(
    process.env.MONGO_ConnectionString,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  );

  console.log(`MongoDB conencted: ${connection.connection.host}`);
};

module.exports = connectDB;
