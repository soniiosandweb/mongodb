import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { retrieveTutorial } from "../actions/tutorials";

function TutorialsList(){

    const dispatch = useDispatch();
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [currentTutotial, setCurrentTutorial] = useState(null);
    const {tutorialItems} = useSelector((state) => state.tutorials);

    const setActiveTutorial = (tutorial, index) =>{
        if(currentIndex === index){
            setCurrentIndex(-1);
            setCurrentTutorial(null);
        } else {
            setCurrentTutorial(tutorial);
            setCurrentIndex(index);
        }
       
    }
    
    useEffect(()=>{
        dispatch(retrieveTutorial())
    }, [dispatch]);
    
    return (
        <div className="list container">
            <div className="row">
                <div className="col-md-6">
                    <h2>Tutorials List</h2>
                    <ul className="list-group">
                        {tutorialItems.map((tutorial, index) => (
                            <li key={index} className={"list-group-item " + (currentIndex === index ? "active" : "")} onClick={()=>setActiveTutorial(tutorial, index)}>{tutorial.title}</li>
                        ))}
                    </ul>
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