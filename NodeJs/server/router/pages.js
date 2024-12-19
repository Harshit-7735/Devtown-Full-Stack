const router = require("express").Router();
const path =  require("path");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages/todos.html"));
    });

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages/login.html"));
    });

router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages/signup.html"));
    });

module.exports = router;