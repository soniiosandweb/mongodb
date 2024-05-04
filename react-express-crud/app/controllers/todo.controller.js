const db = require("../models");
const Todo = db.todo;
const mongoose = require("mongoose");

exports.findTodoLimit = (req, res) => {
  const limit = req.params.limit;
  Todo.find().limit(limit)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message : err.message || "Some error occurred while retrieving Todos."
    })
  })
}

exports.findTodo = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: new RegExp(title, "i") } : null;
  Todo.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Todos.",
      });
    });
};

exports.addTodo = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const todo = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  Todo.create(todo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the Todo.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id);

  Todo.findOne(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Todo with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Todo with id=" + id,
      });
    });
};

exports.updateTodo = (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  const filter = { _id: id };

  const updateValue = {
    $set: {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false,
    },
  };

  Todo.updateOne(filter, updateValue)
    .then((num) => {
      if (num["modifiedCount"] == 1) {
        res.send({
          message: "Record updated successfully.",
        });
      } else {
        res.send({
          message : `Todo not updated with id=${id}. Maybe Todo not found or response body is empty.`
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message : "Error updating Todo item with id= " + id
      });
    });
};

// Delete a Todo with the specified id in the request
exports.deleteTodo = (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id);

  const filter = { _id: id };

  Todo.deleteOne(filter)
    .then((num) => {
      if (num["deletedCount"] == 1) {
        res.send({
          message: "Todo was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Todo with id=" + id,
      });
    });
};

// Delete All Todo
exports.deleteAllTodo = (req, res) =>{
  const filter = {};
  Todo.deleteMany(filter)
  .then((num) => {
    res.send({
      message: `${num} Todos was deleted successfully!`
    })
  })
  .catch((err) => {
    res.send(500).send({
      message: "Some error occurred while removing all Todos."
    })
  })
}

// find all published Todo
exports.findAllPublished = (req, res) => {
  const value = req.query.value;
  var condition = value ? { published: value } : null;

  Todo.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving todos.",
      });
    });
};