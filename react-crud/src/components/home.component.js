import React from "react";
import TutorialsList from "./tutorials-list.component";
import TodosList from "./todos-list.component";

function HomePage(){
    return(
        <div className="page-layout">
            <TutorialsList />
            <TodosList />
        </div>
    )
}

export default HomePage