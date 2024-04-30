const db = require("../models");
const Todo = db.todo;
const mongoose = require('mongoose');

exports.findTodo = (req,res) => {
    Todo.find()
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || "Some error occurred while retrieving tutorials."
        });
    });
};

exports.addTodo = (req, res) => {
    if(!req.body.title){
        res.status(400).send({
            message : "Content can not be empty!",
        });
        return
    }

    const todo = {
        title : req.body.title,
        description : req.body.description,
        published : req.body.published ? req.body.published : false
    };

    Todo.create(todo)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || "Some error occured while creating the Todo.",
        });
    });
};