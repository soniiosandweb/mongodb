import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoItem, getTodo, updateTodoData } from "../actions/todo";

function TodoPage(){

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [success, setSuccess] = useState(false);

    const {todoItem} = useSelector((state) => state.todos);

    const updateTodoItem = (event) => {
        if(event) event.preventDefault();

        var data = {
            id: id,
            title: title,
            description: description
        }

        dispatch(updateTodoData(id,data)).then(response => {
            dispatch(getTodo(id));
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false)
            }, 1000);
        })
        .catch(e => {
            console.log(e);
        })
    }

    const deleteTodoData = (id) =>{
        dispatch(deleteTodoItem(id)).then(response => {
            console.log(response)
            navigate('/');
        })
        .catch((e) => {
            console.log(e)
        })
    }

    const publishTodo = (status) => {
        var data = {
            id: todoItem.id,
            title: todoItem.title,
            description: todoItem.description,
            published: status
        }

        dispatch(updateTodoData(id, data)).then(response => {
            dispatch(getTodo(id));
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 1000);
        })
        .catch((e) => {
            console.log(e);
        })
    }


    useEffect(()=>{
        dispatch(getTodo(id)).then(response => {
            console.log(response)
        })
    }, [dispatch, id])

    return(
        <div>

            {todoItem ? 
            (
                <div>
                    <h2>Tutorial</h2>
                    <form onSubmit={updateTodoItem}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={title ? title : todoItem.title}
                                required
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={description ? description : todoItem.description}
                                required
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <strong>Status: </strong>{todoItem.published ? "Published" : "Pending"}
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-space" type="submit">Update</button>
                            <button type="button" className="btn btn-danger btn-space" onClick={() => deleteTodoData(todoItem.id)}>Delete</button>
                            {todoItem.published ? 
                                (
                                    <button type="button" className="btn btn-secondary btn-space" onClick={()=>publishTodo(false)}>UnPublish</button>
                                ) : (
                                    <button type="button" className="btn btn-secondary btn-space" onClick={()=>publishTodo(true)}>Publish</button>
                                )
                            }
                            <button className="btn btn-warning btn-space" type="button" onClick={() => navigate("/todos")}>Back</button>
                        </div>
                       
                        <div className="form-group">
                            {success ?
                                <p>Record Updated Successfully</p>
                            : '' }
                        </div>
                    </form>
                </div>
            ) : (
                <div>
                    <p>Todo Item Not Found</p>
                    <a href="/" className="btn btn-warning">Go Back</a>
                </div>
            )}
        </div>
    )
}

export default TodoPage