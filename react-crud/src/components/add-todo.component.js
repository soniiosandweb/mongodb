import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTodoItemData } from "../actions/todo";

function AddTodo(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [id, setId] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [published, setPublished] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    function newTodoItem(){
        setId(null);
        setTitle('');
        setDescription('');
        setPublished(false);
        setSubmitted(false);
    }

    const changeTitle = (e) =>{
        setTitle(e.target.value)
    }

    const changeDescription = (e) => {
        setDescription(e.target.value)
    }

    const saveTodo = (event) => {
        if(event) event.preventDefault();

        var data ={
            title: title,
            description: description
        }
        dispatch(addTodoItemData(data)).then(response => {
            // console.log(response)
            setId(response.id);
            setTitle(response.title);
            setDescription(response.description);
            setPublished(response.createdAt);
            setSubmitted(true);
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <div className="submit-form">
            {submitted ?
                <div>
                    <h4>Todo Added Successfully</h4>
                    <p>Published on: {published}</p>
                    <p>Record Id: {id}</p>
                    <button className="btn btn-success btn-space" onClick={newTodoItem}>Add</button>
                    <button className="btn btn-warning btn-space" onClick={() => navigate('/todos')}>Back</button>
                </div>
            :
                <form onSubmit={saveTodo}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text"
                            name="title"
                            id="title"
                            className="form-control"
                            value={title}
                            onChange={changeTitle}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input 
                            type="text"
                            name="description"
                            id="description"
                            className="form-control"
                            value={description}
                            onChange={changeDescription}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-success" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            }
        </div>
    )
}

export default AddTodo;