import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTodo } from "../actions/todo";

function TodoPage(){

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [success, setSuccess] = useState(false);

    const {todoItem} = useSelector((state) => state.todos);

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
                    <form >
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
                            {success ?
                                <p>Record Updated Successfully</p>
                            : '' }
                        </div>
                    </form>
                </div>
            ) : (
                <div>
                    <p>Tutorial Not Found</p>
                    <a href="/" className="btn btn-warning">Go Back</a>
                </div>
            )}
        </div>
    )
}

export default TodoPage