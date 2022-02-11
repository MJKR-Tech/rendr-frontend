import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import { Upload } from "./components/Upload";


function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Switch>
        <Route path='/' exact/>
      </Switch>
    </Router>
        <div className="App">
          <Upload>
            <button>Upload Files</button>
          </Upload>
        </div>
    </>
  );
}

export default App;
