const express = require("express");
const fs = require("fs/promises");
const uuid = require("uuid");

const PORT = 8080;
// expres instance
const app = express();

// middleware
/*
const logger = async (req, res, next) => {
  const {headers, method, url,query,path} = req;
  console.log({
    headers,
    method,
    url,
    query,
    path,
  });
  next();
}
app.use(logger);  
app.get('/',logger, (req, res) => {
  res.send("Hello World");
});
*/

/*
app.post('/signup', async (req, res) => {
  try {
    const {email,password} = req.body;
    return res.status(200).json({
      email,
      password,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
*/

// Authentification
app.use(express.json());
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = uuid.v4();
    const user = {
      email,
      password,
      token,
    };

    // read file
    const users = await fs.readFile("./users.json", "utf-8");
    const parsedUsers = JSON.parse(users);
    if (parsedUsers.find((user) => user.email === email)) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    // to add user to the file
    parsedUsers.push(user);

    await fs.writeFile("./users.json", JSON.stringify(parsedUsers));
    return res.status(200).json({
      email,
      password,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
});

// validate the token and if token is invalid throw the error
const isAuthorised = async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }
    const users = await fs.readFile("./users.json", "utf-8");
    const parsedUsers = JSON.parse(users);
    const user = parsedUsers.find((user) => user.token === token);
    if (!user) {
      return res.status(401).json({ message: "invalid token" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

// for todos
app.get("/todos", isAuthorised, async (req, res) => {
  try {
    const todos = await fs.readFile("./db.json", "utf-8");
    const parsesdTodos = JSON.parse(todos);
    res.status(200).json(parsesdTodos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
