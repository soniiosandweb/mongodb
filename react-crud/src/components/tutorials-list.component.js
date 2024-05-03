import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { deleteAllTutorials, filterPublishedTutorial, filterTutorialByTitle, retrieveTutorial } from "../actions/tutorials";

function TutorialsList(){

    const dispatch = useDispatch();
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [currentTutotial, setCurrentTutorial] = useState(null);
    const {tutorialItems} = useSelector((state) => state.tutorials);
    const [searchTitle, setSearchTitle] = useState('');
    const [selected, setSelected] = useState('');

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
            setSelected('');
            setCurrentIndex(-1);
            setCurrentTutorial(null);
        })
        .catch(err => {
            console.log(err)
        })
    }

    const filterPublishedData = (e) => {
        setSelected(e.target.value);
        dispatch(filterPublishedTutorial(e.target.value)).then(response => {
            setCurrentIndex(-1);
            setCurrentTutorial(null);
            setSearchTitle('');
        })
        .catch(err => {
            console.log(err)
        })
    }

    const resetFilter = () => {
        dispatch(retrieveTutorial()).then(response =>{
            setSelected('');
            setSearchTitle('');
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
            <div className="row">
                <div className="col-md-6">
                    <div className="input-group justify-content-between mb-3">
                        <h2>Tutorial List</h2>
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
                    <ul className="list-group">
                        {tutorialItems.length ?
                            tutorialItems.map((tutorial, index) => (
                                <li key={index} className={"list-group-item " + (currentIndex === index ? "active" : "")} onClick={()=>setActiveTutorial(tutorial, index)}>{tutorial.title}</li>
                            ))
                        :
                            <li className="list-group-item">No Record Found</li>
                        }
                    </ul>

                    <button className="mt-3 btn btn-danger btn-space" onClick={() => deleteAllTutorialData()}>Delete All</button>
                    <button className="btn btn-secondary btn-space mt-3" onClick={() => resetFilter()}>Clear All Filter</button>
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