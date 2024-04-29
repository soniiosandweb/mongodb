import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTodoList } from '../actions/todo';

function TodosList(){

    const dispatch = useDispatch();
    const {todosItem} = useSelector((state) => state.todos);

    useEffect(() => {
        dispatch(getAllTodoList())
    }, [dispatch]);

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-6'>
                    <h2>Todo List</h2>
                    <ul className='list-group'>
                        {todosItem.map((todo, index) => (
                            <li key={index} className={"list-group-item "} >{todo.title}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TodosList;