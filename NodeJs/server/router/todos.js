const express = require("express");
const router = express.Router();
const { isAutorised } = require("../middlewares");
const fs = require("fs/promises");
const uuid = require("uuid");
// post request to add a new todo
router.post("/", isAutorised, async (req, res) => {
  try {
    const { user } = req; //user is the user object from the request
    const { title } = req.body; //title is the title of the todo from the request
    if (!title) {
      return res.status(400).json({
        message: "Title is required",
        success: false,
      });
    }
    const todo = {
      //todo object to be added to the database
      id: uuid.v4(),
      title,
      userId: user.id,
      complete: false,
    };
    const todos = await fs.readFile("./db/todo.json", "utf-8"); //reading the todos from the database
    const parsedTodos = JSON.parse(todos); //parsing the todos from the database
    parsedTodos.push(todo); //pushing the new todo to the todos array

    await fs.writeFile("./db/todo.json", JSON.stringify(parsedTodos)); //writing the new todos array to the database

    // return the response to the client with the new todo object and a success message
    return res.json({
      data: todo,
      success: true,
      message: "Todo added successfully",
    });
    // catch any error that occurs and return a 500 status code with an error message
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

// get request to get all todos
router.get("/", isAutorised, async (req, res) => {
  try {
    const { user } = req;
    const todos = await fs.readFile("./db/todo.json", "utf-8");
    const parsedTodos = JSON.parse(todos);

    return res.json({
      //return the response to the client with the todos that belong to the user
      data: parsedTodos.filter((todo) => todo.userId === user.id),
      success: true,
    });
  } catch (error) {}
});

// edit a todo

router.patch("/:id", isAutorised, async (req, res) => {
  try {
    const { user } = req;
    const { id: todoid } = req.params;
    const { title, complete } = req.body;
    // check id the todo exists
    const todos = await fs.readFile("./db/todo.json", "utf-8");
    const parsedTodos = JSON.parse(todos);
    const todo = parsedTodos.find((todo) => todo.id === todoid);
    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
        success: false,
      });
    }

    // check if the todo belongs to the user
    if (todo.userId !== user.id) {
      return res.status(403).json({
        message: "You are not authorized to edit this todo",
        success: false,
      });
    }
    // update the todo
    todo.title = title;
    if (title == undefined) {
      todo.title = todo.title;
    }
    todo.complete = complete;
    if (complete == undefined) {
      todo.complete = false;
    }
    await fs.writeFile("./db/todo.json", JSON.stringify(parsedTodos));
    return res.json({
      data: todo,
      success: true,
      message: "Todo updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

// delete a todo
router.delete("/:id", isAutorised, async (req, res) => {
    try {
// get the user from the request
        const { user } = req;
        const { id: todoid } = req.params;
        const todos = await fs.readFile("./db/todo.json", "utf-8");
        const parsedTodos = JSON.parse(todos);
        const todo = parsedTodos.find((todo) => todo.id === todoid);
        if (!todo) {
            return res.status(404).json({
                message: "Todo not found",
                success: false,
            });
        }

        // check if the todo belongs to the user
        if (todo.userId !== user.id) {
            return res.status(403).json({
                message: "You are not authorized to delete this todo",
                success: false,
            });
        }
        // delete the todo
        const newTodos = parsedTodos.filter((todo) => todo.id !== todoid);
        await fs.writeFile("./db/todo.json", JSON.stringify(newTodos));
        return res.json({
            data: todo,
            success: true,
            message: "Todo deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        }); 
    }
});
module.exports = router;
