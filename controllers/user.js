// load db
const {sendMailOnRegistration} =require("../mail/mail");
const { connectToDatabase } = require('../db/dbConnection');
connectToDatabase();
const bcrypt = require('bcrypt'); // For hashing passwords
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs
const User = require('../models/user');
const { registerValidation } = require('../utilities/userValidation');
const {otp} =require("../utilities/util")
const {token}=require("../auth/auth");

const generateToken = (user) => {
  return jwt.sign(user, 'secretKey', { expiresIn: '1h' });
};
const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid email or password' });

  // Check if user status is 'pending'
  if (user.status === 'pending') {
      return res.status(400).json({ message: 'Please complete email verification' });
  }

  // Check password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'Invalid email or password' });

  // Generate JWT token
  const access_token = token(user._id);
  res.json({ access_token });
}
const verifyOTP = async (req, res, next) => {
  const { email, otp } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  // Check if OTP has expired
  if (user.otpExpires < Date.now()) {
    return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
  }
  // Verify OTP
  if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
  // Update user status to active
  user.status = 'active';
  await user.save();
  res.json({ message: 'OTP verified successfully' });
}
const register = async (req, res) => {
  // Validate user input
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user already exists
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) return res.status(400).send('Email already exists');

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // Save OTP and its expiration time in the database
  const user = new User({
      email: req.body.email,
      password: hashedPassword,
      status: 'pending',
      otp: otp,
      otpExpires: Date.now() + 600000, // OTP expires after 10 minutes (in milliseconds)
  });
  try {
      const savedUser = await user.save();
      sendMailOnRegistration(user.email,'User Registered Sucessfully',otp);
      res.status(201).send({message:"User registered sucessfullys",user: savedUser._id });
  } catch (err) {
      res.status(400).send(err);
  }
};
const verifyOTPAndRegister = async (req, res) => {
  const { email, otp } = req.body;

  // Find user by email and check OTP
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send('Invalid email or OTP');

  if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).send('Invalid OTP or OTP expired');
  }

  // If OTP is valid, hash the password and save the user
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  user.password = hashedPassword;
  user.otp = undefined;
  user.otpExpires = undefined;

  try {
      const savedUser = await user.save();
      res.status(201).send({ message: 'User registered successfully', user: savedUser._id });
  } catch (err) {
      console.error('Error registering user:', err);
      res.status(500).send('Internal Server Error');
  }
};
module.exports = {login,register,verifyOTP,verifyOTPAndRegister};

