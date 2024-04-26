const db = require("../models");
const Tutorial = db.tutorials;
const mongoose = require('mongoose');

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const tutorial = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    };
  
    // Save Tutorial in the database
    Tutorial.create(tutorial)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };
  
  // Retrieve all Tutorials from the database.
  exports.find = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: new RegExp(title, 'i') } : null;
  
    Tutorial.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
  
  // Find a single Tutorial with an id
  exports.findOne = (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id); 

    Tutorial.findOne(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };
  
  // Update a Tutorial by the id in the request
  exports.update = (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const filter = { _id: id };

    const updatedDoc = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
      },
    }
  
    Tutorial.updateOne(filter, updatedDoc)
      .then(num => {
        if (num['modifiedCount'] == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };
  
  // Delete a Tutorial with the specified id in the request
  exports.delete = (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id);

    const filter = { _id: id };
  
    Tutorial.deleteOne(filter)
      .then(num => {
        if (num['deletedCount'] == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };
  
  // Delete all Tutorials from the database.
  exports.deleteAll = (req, res) => {

    const filter = {};
    Tutorial.deleteMany(filter)
      .then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };
  
  // find all published Tutorial
  exports.findAllPublished = (req, res) => {
    const value = req.query.value;
    var condition = value ? { published: value } : null;
  
    Tutorial.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };