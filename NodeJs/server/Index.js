const express = require("express");
const fs = require("fs/promises");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const { addToDb } = require("./utils");
const { generateToken } = require("./utils/auth");
const { isAutorised } = require("./middlewares");

const PORT = 8080;
// expres instance
const app = express();
app.use(express.json());

// auth endpoints

// LOGIN
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "please provide the correct details",
        success: false,
      });
    }

    // authentication if the user has entered a corect email,password
    const users = await fs.readFile("./db/users.json", "utf-8");
    const parsedUsers = JSON.parse(users);
    const user = parsedUsers.find((user) => user.email === email);
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
      id: user.id,
      email: user.email,
      username: user.username,
    })
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
app.post("/api/auth/signup", async (req, res) => {
  try {
    // validate the req body
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({
        message: "Please provide all required fields",
        success: false,
      });
    }
    // check if user already exists
    const users = await fs.readFile("./db/users.json", "utf8");
    const parsedUsers = JSON.parse(users);
    if (parsedUsers.find((user) => user.email === email)) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    // validate the username
    if (parsedUsers.find((user) => user.username === username)) {
      return res.status(400).json({
        message: "Username already taken",
        success: false,
      });
    }
    // write to the DB
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      id: uuid.v4(),
      email,
      username,
      password: hashedPassword,
    };
    await addToDb(newUser, "./db/users.json");
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
    });
  }
});

app.get("/api/todo",isAutorised , async (req, res) => {
 try {
  console.log(req.user);
  return res.send("Hello");
 } catch (error) {
  console.log(error);
  res.status(500).json({
    message: "Internal server error",
    success: false,
  });
 }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
