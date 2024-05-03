import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodoLimitData } from "../actions/todo";
import { useNavigate } from "react-router-dom";
import { getTutorialsLimitData } from "../actions/tutorials";

function HomePage(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {todosLimit} = useSelector((state) => state.todos);
    const {tutorialsLimit} = useSelector((state) => state.tutorials)
    const [currentTodoIndex, setCurrentTodoIndex] = useState(-1);
    const [currentTodo, setCurrentTodo] = useState(null);
    const [tutorialIndex, setTutorialIndex] = useState(-1);
    const [currentTutorial, setCurrentTutorial] = useState(null);

    const setActiveTodo = (todo, index) =>{
        if(currentTodoIndex === index){
            setCurrentTodoIndex(-1);
            setCurrentTodo(null);
        } else {
            setCurrentTodo(todo);
            setCurrentTodoIndex(index);
        }
    }

    const setActiveTutorial = (tutorial, index) => {
        if(tutorialIndex === index){
            setTutorialIndex(-1);
            setCurrentTutorial(null);
        } else {
            setTutorialIndex(index);
            setCurrentTutorial(tutorial);
        }
    }

    useEffect(() => {
        dispatch(getAllTodoLimitData(5));
        dispatch(getTutorialsLimitData(5));
    }, [dispatch])

    return(
        <div className="page-layout">
            
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Tutorials List</h2>
                        <ul className="list-group">
                            {tutorialsLimit.length ?
                                (tutorialsLimit.map((tutorial,index) => (
                                    <li className={"list-group-item " + (tutorialIndex === index ? "active" : "")} key={index} onClick={() => setActiveTutorial(tutorial, index)}>{tutorial.title}</li>
                                )))
                            :
                                <li className="list-group-item">No Record Found</li>
                            }
                        </ul>
                        <button className="mt-3 btn btn-primary" onClick={() => navigate('/tutorials')}>View All Tutorials</button>
                    </div>
                    <div className="col-md-6">
                        <h2>Tutorial Item</h2>
                        {currentTutorial ?
                            <div>
                                <div className="margin-top">
                                    <label style={{paddingRight: "5px"}}><strong>Title:</strong></label>
                                    {currentTutorial.title}
                                </div>
                                <div className="margin-top">
                                    <label style={{paddingRight: "5px"}}><strong>Description:</strong></label>
                                    {currentTutorial.description}
                                </div>
                                <div className="margin-top">
                                    <label style={{paddingRight: "5px"}}><strong>Status:</strong></label>
                                    {currentTutorial.published ? "Published" : "Pending"}
                                </div>
                            </div>
                        :
                            <div>
                                <p>Please Click on a Tutorial...</p>
                            </div>
                        }
                        
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Todos List</h2>
                        <ul className="list-group">
                            {todosLimit.length ? 
                                (todosLimit.map((todo, index) => (
                                    <li key={index} className={"list-group-item " + (currentTodoIndex === index ? "active" : "")} onClick={() => setActiveTodo(todo,index)}>{todo.title}</li>
                                )))
                            :
                            <li className="list-group-item">No Record Found</li>
                            }
                        </ul>
                        <button className="btn btn-primary btn-space mt-3" onClick={() => navigate('/todos')}>View All Todos</button>
                    </div>
                    <div className="col-md-6">
                        <h2>Todo Item</h2>
                        {currentTodo ? 
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

                            </div>
                        :
                            <div>
                                <p>Please Click on a Todo Item...</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage