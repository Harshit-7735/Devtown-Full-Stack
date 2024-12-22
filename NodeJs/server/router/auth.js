const express = require("express");

const bcrypt = require("bcryptjs");
const router = express.Router();
const { generateToken } = require("../utils/auth");

const { User } = require("../db/models/user");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "please provide the correct details",
        success: false,
      });
    }

    // authentication if the user has entered a corect email,password
    const user = await User.findOne({ email });
    if (!email) {
      return res.json({
        message: "Please enter the correct email",
        success: false,
      });
    }

    // validate the password
    const hasValpass = await bcrypt.compare(password, user.password);
    if (!hasValpass) {
      return res.json({
        message: "The password is incorret",
        success: false,
      });
    }
    // if the user is authenticated then send the user data
    const token = generateToken({
      id: user._id,
      email: user.email,
      username: user.username,
    });
    return res.json({
      data: {
        token,
      },
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    // validate the req body
    const { email, password, username } = req.body;
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    return res.json({
      data: {
        ...newUser,
      },
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
