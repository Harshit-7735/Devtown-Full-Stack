const express = require("express");
const authRouter = require("./router/auth");
const todoRouter = require("./router/todos");
const pageroutes = require("./router/pages");
const connectDB = require("./utils/db.utils");

const PORT = 8080;
// expres instance
const app = express();
connectDB();

app.use(express.json());

// auth endpoints
app.use("/api/auth", authRouter);

app.use("/api/todos",todoRouter);
app.use("/",pageroutes);

  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
