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