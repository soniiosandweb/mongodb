module.exports = (app) => {
  const todoList = require("../controllers/todo.controller");

  var router = require("express").Router();

  // Todo List with limit
  router.get("/limit/:limit", todoList.findTodoLimit)

  // Todo List
  router.get("/", todoList.findTodo);

  // Add Todo
  router.post("/", todoList.addTodo);

  // Retrieve a single Todo with id
  router.get("/:id", todoList.findOne);

  // Update a Todo with id
  router.put("/:id", todoList.updateTodo);

  // Delete a Todo with id
  router.delete("/:id", todoList.deleteTodo);

  // Delete All Todos
  router.delete("/", todoList.deleteAllTodo);

  app.use("/api/todo-list", router);
};