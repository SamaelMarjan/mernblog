const { hashPass, comparePassword } = require("../helpers/authHelper");
const user = require("../models/userModel");
// const bcrypt = require("bcrypt");
// const
const jwt = require("jsonwebtoken");

// create user controller
exports.createUserController = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    const { id } = req.params;
    // validation
    if (!username || !email || !password) {
      return res.status(500).send({
        success: false,
        message: "Fill all the field",
      });
    }
    // check existing usernname
    const existingUserName = await user.findOne({ username });
    if (existingUserName) {
      return res.status(500).send({
        success: false,
        message: "Use different username",
      });
    }
    // check existing user
    const existingUserEmail = await user.findOne({ email });
    if (existingUserEmail) {
      return res.status(500).send({
        success: false,
        message: "User already exists.",
      });
    }
    // password and confirm password should match
    if (confirmPassword !== password) {
      return res.status(500).send({
        success: false,
        message: "Password and confirm password should be same",
      });
    }
    // hash password
    const hashPassword = await hashPass(password);
    const newUser = await user({
      ...req.body,
      password: hashPassword,
      confirmPassword: hashPassword,
    }).save();
    // const {password, ...others} = newUser._doc
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).send({
      success: true,
      message: "User created successfully",
      newUser,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Failed to create user",
      error,
    });
  }
};

// login user controller
exports.loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { id } = req.params;
    // validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Submit email and password",
      });
    }
    // check user
    const loginUser = await user.findOne({ email });
    if (!loginUser) {
      return res.status(500).send({
        success: false,
        message: "Invalid credential",
      });
    }
    // compare password
    // const hashPass = await bcrypt.hash(password, 10)
    const comparePass = await comparePassword(password, loginUser.password);
    if (!comparePass) {
      return res.status(500).send({
        success: false,
        message: "Invalid credential",
      });
    }
    const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).send({
      success: true,
      message: "Login successfull",
      loginUser,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Login failed",
      error,
    });
  }
};

// get all user

// update user

// delete user
