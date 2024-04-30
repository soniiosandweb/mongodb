module.exports = (app) => {
  const todoList = require("../controllers/todo.controller");

  var router = require("express").Router();

  // Todo List
  router.get("/", todoList.findTodo);

  // Add Todo
  router.post("/", todoList.addTodo);

  app.use("/api/todo-list", router);
};