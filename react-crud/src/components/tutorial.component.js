import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TutorialDataService from '../services/tutorial.service';

function Tutorial(){

    const {id} = useParams();
    const [currentTutotial, setCurrentTutorial] = useState(null);

    useEffect(()=>{
        TutorialDataService.get(id)
        .then((response) =>{
            setCurrentTutorial(response.data);
        })
        .catch(e =>
            console.log(e)
        )
    }, [id])

    return(
        <>
            {currentTutotial ? 
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
                                defaultValue={currentTutotial.title}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                defaultValue={currentTutotial.description}
                                required
                            />
                        </div>
                    </form>
                </div>
            ) : (
                <div>
                    <p>Tutorial Not Found</p>
                    <a href="/" className="btn btn-warning">Go Back</a>
                </div>
            )}
        </>
    )
}

export default Tutorial