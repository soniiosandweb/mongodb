import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTutorial, getTutorial, updateTutorial } from "../actions/tutorials";

function Tutorial(){

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [success, setSuccess] = useState(false);

    const {tutorialItem} = useSelector((state) => state.tutorials);

    const updateTutorialData = (event) => {
        if(event) event.preventDefault();

        var data = {
            id: id,
            title: event.target.title.value,
            description: event.target.description.value
        }

        dispatch(updateTutorial(id , data)).then(response => {
            dispatch(getTutorial(id));
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 1000);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    const publishTutorial = (status) => {
        var data = {
            id: tutorialItem.id,
            title: tutorialItem.title,
            description: tutorialItem.description,
            published: status
        }

        dispatch(updateTutorial(id, data)).then(response => {
            dispatch(getTutorial(id));
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 1000);
        })
        .catch((e) => {
            console.log(e);
        })
    }

    const deleteTutorialData = (id) =>{
        dispatch(deleteTutorial(id)).then(response => {
            console.log(response)
            navigate('/');
        })
        .catch((e) => {
            console.log(e)
        })
    }
    
    useEffect(()=>{
        dispatch(getTutorial(id));
    }, [dispatch, id])

    return(
        <>
            {tutorialItem ? 
            (
                <div>
                    <h2>Tutorial</h2>
                    <form onSubmit={updateTutorialData}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={title ? title : tutorialItem.title}
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
                                value={description ? description : tutorialItem.description}
                                required
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <strong>Status: </strong>{tutorialItem.published ? "Published" : "Pending"}
                        </div>
                        <div className="form-group">
                            {tutorialItem.published ? 
                                (
                                    <button type="button" className="btn btn-primary btn-space" onClick={() => publishTutorial(false)}>UnPublish</button>
                                ) : (
                                    <button type="button" className="btn btn-primary btn-space" onClick={() => publishTutorial(true)}>Publish</button>
                                )
                            }
                            
                            <button type="button" className="btn btn-danger btn-space" onClick={() => deleteTutorialData(tutorialItem.id)}>Delete</button>
                            <button type="submit" className="btn btn-success btn-space" >Update</button>
                            <button type="button" className="btn btn-warning btn-space" onClick={() => navigate('/')}>Back</button>
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
        </>
    )
}

export default Tutorial