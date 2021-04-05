const User = require("../models/User");
const ErrorResponse = require("../utils/errorMessage");

//@desc     Registrazione nuovo Utente
//@route    POST /api/v1/auth
//@access   Public
exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  //Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  sendTokenResponse(user, res);
};

//@desc     Get ALL Utenti
//@route    GET /api/v1/auth/
//@access   Public
exports.getUser = async (req, res, next) => {
  let query = User.find();
  const users = await query;
  res.status(200).json({ data: users });
};

//@desc     Login User
//@route    POST /api/v1/auth/login
//@access   Public
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  //Validate email and password
  if (!email || !password) {
    next(new ErrorResponse("Aggiungi email o password", 400));
  }
  const user = await User.findOne({ email }).select("password");

  if (!user) {
    return next(new ErrorResponse("User not found,", 404));
  }

  //Check if password match
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  sendTokenResponse(user, res);
};

/*
    Methods
*/
const sendTokenResponse = (user, res) => {
  const token = user.getSignedJwtToken();
  res.status(200).cookie("token", token).json({ succes: true, token: token });
};
