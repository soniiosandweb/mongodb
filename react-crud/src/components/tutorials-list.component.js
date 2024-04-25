import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { deleteAllTutorials, filterTutorialByTitle, retrieveTutorial } from "../actions/tutorials";

function TutorialsList(){

    const dispatch = useDispatch();
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [currentTutotial, setCurrentTutorial] = useState(null);
    const {tutorialItems} = useSelector((state) => state.tutorials);
    const [searchTitle, setSearchTitle] = useState('');

    const setActiveTutorial = (tutorial, index) =>{
        if(currentIndex === index){
            setCurrentIndex(-1);
            setCurrentTutorial(null);
        } else {
            setCurrentTutorial(tutorial);
            setCurrentIndex(index);
        }
       
    }

    const deleteAllTutorialData = () => {
        dispatch(deleteAllTutorials()).then(response => {
            // console.log(response);
            setCurrentIndex(-1);
            setCurrentTutorial(null);
        })
        .catch(err => {
            console.log(err)
        })
    }

    const findByTitle = () => {
        dispatch(filterTutorialByTitle(searchTitle)).then(response => {
            // console.log(response);
            setCurrentIndex(-1);
            setCurrentTutorial(null);
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    useEffect(()=>{
        dispatch(retrieveTutorial())
    }, [dispatch]);
    
    return (
        <div className="list container">
            <div className="row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
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
            <div className="row">
                <div className="col-md-6">
                    <h2>Tutorials List</h2>
                    <ul className="list-group">
                        {tutorialItems.map((tutorial, index) => (
                            <li key={index} className={"list-group-item " + (currentIndex === index ? "active" : "")} onClick={()=>setActiveTutorial(tutorial, index)}>{tutorial.title}</li>
                        ))}
                    </ul>

                    <button className="margin-top btn btn-danger" onClick={() => deleteAllTutorialData()}>Delete All</button>
                </div>
                <div className="col-md-6">
                    <h2>Tutorial</h2>
                    {currentTutotial ? (
                        <div>
                            <div className="margin-top">
                                <label style={{paddingRight: "5px"}}><strong>Title:</strong></label>
                                {currentTutotial.title}
                            </div>
                            <div className="margin-top">
                                <label style={{paddingRight: "5px"}}><strong>Description:</strong></label>
                                {currentTutotial.description}
                            </div>
                            <div className="margin-top">
                                <label style={{paddingRight: "5px"}}><strong>Status:</strong></label>
                                {currentTutotial.published ? "Published" : "Pending"}
                            </div>
                            <div className="margin-top">
                                <a href={"/tutorials/"+currentTutotial.id} className="btn btn-warning">Edit</a>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p>Please Click on a Tutorial...</p>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default TutorialsList;