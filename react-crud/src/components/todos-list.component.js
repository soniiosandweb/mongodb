import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllTodosData, filterPublishedTodo, filterTodoByTitle, getAllTodoList } from '../actions/todo';

function TodosList(){

    const dispatch = useDispatch();
    const {todosItem} = useSelector((state) => state.todos);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [currentTodo, setCurrentTodo] = useState(null);
    const [searchTitle, setSearchTitle] = useState('');
    const [selected, setSelected] = useState('');

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

    const findByTitle = () => {
        dispatch(filterTodoByTitle(searchTitle)).then(response => {
            // console.log(response);
            setSelected('');
            setCurrentIndex(-1);
            setCurrentTodo(null);
        })
        .catch(err => {
            console.log(err)
        })
    }

    const filterPublishedData = (e) => {
        setSelected(e.target.value);
        dispatch(filterPublishedTodo(e.target.value)).then(response => {
            setCurrentIndex(-1);
            setCurrentTodo(null);
            setSearchTitle('');
        })
        .catch(err => {
            console.log(err)
        })
    }

    const resetFilter = () => {
        dispatch(getAllTodoList()).then(response =>{
            setSelected('');
            setSearchTitle('');
            setCurrentIndex(-1);
            setCurrentTodo(null);
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        dispatch(getAllTodoList())
    }, [dispatch]);

    return (
        <div className='container'>

            <div className="row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            id="search_title"
                            onChange={(e) => setSearchTitle(e.target.value)}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => findByTitle()}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-6'>
                    <div className="input-group justify-content-between mb-3">
                        <h2>Todo List</h2>
                        <select 
                            className="form-control-sm rounded" 
                            value={selected} 
                            onChange={(e) => filterPublishedData(e)}
                            id="filter_published"
                        >
                            <option value="">Select Filter</option>
                            <option value="true">Published</option>
                            <option value="false">Pending</option>
                        </select>
                    </div>
                    <ul className='list-group'>
                        {todosItem.length ?
                            todosItem.map((todo, index) => (
                                <li key={index} className={"list-group-item "+ (currentIndex === index ? "active" : "")} onClick={()=>setActiveTodo(todo, index)}>{todo.title}</li>
                            ))
                        :
                            <li className='list-group-item'>No Record Found</li>
                        }
                    </ul>

                    <button onClick={()=>deleteAllTodos()} className='btn btn-danger btn-space mt-3'>Delete All</button>
                    <button className="btn btn-secondary btn-space mt-3" onClick={() => resetFilter()}>Clear All Filter</button>
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