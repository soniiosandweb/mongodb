import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Routes, Route, Link } from "react-router-dom";

import AddTutorial from "./components/add-tutorial.component";
import TutorialsList from './components/tutorials-list.component';
import Tutorial from './components/tutorial.component';
import HomePage from './components/home.component';
import TodosList from './components/todos-list.component';

function App() {
  return (
    <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container justify-content-start">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">MongoDB</a>
            </div>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/tutorials"} className="nav-link">Tutorials</Link>
              </li>
              <li className="nav-item">
                <Link to={"/todos"} className="nav-link">Todos</Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">Add Tutorial</Link>
              </li>
            </div>
          </div>
        </nav>

        <div className="container mt-3">
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/tutorials" element={<TutorialsList/>} />
              <Route path="/add" element={<AddTutorial/>} />
              <Route path='/tutorials/:id' element={<Tutorial />} />
              <Route path='/todos' element={<TodosList />} />
            </Routes>
        </div>
      </div>
  );
}

export default App;
