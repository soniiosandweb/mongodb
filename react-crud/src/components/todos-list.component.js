import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllTodosData, getAllTodoList } from '../actions/todo';

function TodosList(){

    const dispatch = useDispatch();
    const {todosItem} = useSelector((state) => state.todos);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [currentTodo, setCurrentTodo] = useState(null);

    const setActiveTodo = (todo, index) =>{
        if(currentIndex === index){
            setCurrentIndex(-1);
            setCurrentTodo(null);
        } else {
            setCurrentTodo(todo);
            setCurrentIndex(index);
        }
       
    }

    const deleteAllTodos = () => {
        dispatch(deleteAllTodosData()).then(response => {
            setCurrentIndex(-1);
            setCurrentTodo(null);
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    useEffect(() => {
        dispatch(getAllTodoList())
    }, [dispatch]);

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-6'>
                    <h2>Todo List</h2>
                    <ul className='list-group'>
                        {todosItem.length ?
                            todosItem.map((todo, index) => (
                                <li key={index} className={"list-group-item "+ (currentIndex === index ? "active" : "")} onClick={()=>setActiveTodo(todo, index)}>{todo.title}</li>
                            ))
                        :
                            <li className='list-group-item'>No Record Found</li>
                        }
                    </ul>

                    <button onClick={()=>deleteAllTodos()} className='btn btn-danger mt-3'>Delete All</button>
                </div>

                <div className="col-md-6">
                    <h2>Todo</h2>
                    {currentTodo ? (
                        <div>
                            <div className="margin-top">
                                <label style={{paddingRight: "5px"}}><strong>Title:</strong></label>
                                {currentTodo.title}
                            </div>
                            <div className="margin-top">
                                <label style={{paddingRight: "5px"}}><strong>Description:</strong></label>
                                {currentTodo.description}
                            </div>
                            <div className="margin-top">
                                <label style={{paddingRight: "5px"}}><strong>Status:</strong></label>
                                {currentTodo.published ? "Published" : "Pending"}
                            </div>
                            <div className="margin-top">
                                <a href={"/todos/"+currentTodo.id} className="btn btn-warning">Edit</a>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p>Please Click on a Todo Item...</p>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default TodosList;