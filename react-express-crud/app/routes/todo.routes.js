module.exports = (app) => {
  const todoList = require("../controllers/todo.controller");

  var router = require("express").Router();

  // Todo List
  router.get("/", todoList.findTodo);

  // Add Todo
  router.post("/", todoList.addTodo);

   // Retrieve a single Tutorial with id
   router.get("/:id", todoList.findOne);

  app.use("/api/todo-list", router);
};