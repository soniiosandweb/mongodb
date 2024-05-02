const db = require("../models");
const Todo = db.todo;
const mongoose = require("mongoose");

exports.findTodo = (req, res) => {
  Todo.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
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
          message: `Cannot find Tutorial with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
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
          message: "Tutorial was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};
