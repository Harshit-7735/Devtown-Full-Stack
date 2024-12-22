const express = require("express");
const { isAutorised } = require("../middlewares");
const fs = require("fs/promises");
const uuid = require("uuid");
const { Todo } = require("../db/models/todo");
const router = require("express").Router();

// get all todos
router.get("/", isAutorised, async (req, res) => {
  try {
    const { user } = req;
    const todos = await Todo.find({ userId: user.id });
    return res.json({
      data: todos,
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

// post a todo
router.post("/", isAutorised, async (req, res) => {
  try {
    const { user } = req;
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({
        message: "title is required",
        success: false,
      });
    }
    const todo = await Todo.create({
      
      title,
      complete: false,
      userId: user.id,
    });
    return res.json({
      data: todo,
      success: true,
      message: "todo created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

// update a todo
router.patch("/:id", isAutorised, async (req, res) => {
  try {
    const { user } = req;
    const { id: todoId } = req.params;
    const { title, complete } = req.body;
    const todo = Todo.findOne({ _id: todoId });
    if (todo.userId !== user.id) {
      return res.status(401).json({
        message: "unauthorized",
        success: false,
      });
    }
    // update the todo
    if (title !== undefined) {
      todo.title = title;
    }
    if (complete !== undefined) {
      todo.complete = complete;
    }
    await Todo.findOneAndUpdate({ _id: todoId }, todo, { new: true });
    return res.json({
      data: todo,
      success: true,
      message: "todo updated successfully",
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
    const todo = await Todo.findOne({ _id: todoid }, { userId: user.id });
    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
        success: false,
      });
    }

    // delete the todo
    await Todo.findByIdAndDelete(todoid);
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
