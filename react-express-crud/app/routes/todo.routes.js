module.exports = (app) => {
  const todoList = require("../controllers/todo.controller");

  var router = require("express").Router();

  // Todo List
  router.get("/", todoList.findTodo);

  app.use("/api/todo-list", router);
};