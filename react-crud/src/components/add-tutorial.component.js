import React, { useState } from "react";
import TutorialDataService from "../services/tutorial.service";

function AddTutorial(){

  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

    TutorialDataService.create(data)
      .then(response => {
        setId(response.data.id);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setPublished(response.data.createdAt);
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  return(
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <p>Record ID: {id}</p>
          <p>Submitted on {published}</p>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
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

            <button className="btn btn-success">
              Submit
            </button>
          </form>
      )
      }
    </div>
  )
}

export default AddTutorial