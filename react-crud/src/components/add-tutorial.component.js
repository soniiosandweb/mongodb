import React, { useEffect, useState } from "react";
import { createTutorial } from "../actions/tutorials";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTodoList } from "../actions/todo";

function AddTutorial(){

  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {todosItem} = useSelector((state) => state.todos)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeTitle = (e) =>{
    setTitle(e.target.value)
  }

  const changeDescription = (e) =>{
    setDescription(e.target.value)
  }

  const newTutorial = () => {
    setId(null);
    setTitle("");
    setDescription("");
    setPublished(false);
    setSubmitted(false);
  }

  const saveTutorial = (event) => {
    if(event) event.preventDefault();

    var data = {
      title: title,
      description: description
    }

    dispatch(createTutorial(data)).then(response => {
      setId(response.id);
      setTitle(response.title);
      setDescription(response.description);
      setPublished(response.createdAt);
      setSubmitted(true);
      console.log(response);
    })
    .catch((e) => {
      console.log(e);
    });

  }

  useEffect(()=>{
    dispatch(getAllTodoList())
  })

  return(
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Tutorial submitted successfully!</h4>
          <p>Record ID: {id}</p>
          <p>Submitted on {published}</p>
          <button className="btn btn-success btn-space" onClick={newTutorial}>
            Add
          </button>
          <button className="btn btn-warning btn-space" onClick={() => navigate('/')}>
            Back
          </button>
        </div>
      ) : (
          <form onSubmit={saveTutorial}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={title}
                onChange={changeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={description}
                onChange={changeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="todo">Select Todo</label>
              <select name="todo">
                {todosItem.map((todo,index) => (
                  <option value={todo.id}>{todo.title}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <button className="btn btn-success" type="submit">
                Submit
              </button>
            </div>
          </form>
        )
      }
    </div>
  )
}

export default AddTutorial