module.exports = (app) => {
  const todoList = require("../controllers/todo.controller");

  var router = require("express").Router();

  // Todo List
  router.get("/", todoList.findTodo);

  // Add Todo
  router.post("/", todoList.addTodo);

  // Retrieve a single Todo with id
  router.get("/:id", todoList.findOne);

  // Update a Todo with id
  router.put("/:id", todoList.updateTodo);

  // Delete a Tutorial with id
  router.delete("/:id", todoList.deleteTodo);

  app.use("/api/todo-list", router);
};