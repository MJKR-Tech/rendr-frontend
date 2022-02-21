import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import { Upload } from "./components/Upload";
import Home from "./components/pages/Home";


function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/' exact component = {Home} />
        </Switch>
      </Router>
        {/* <div className="App">
          <Upload>
            <button>Upload Files</button>
          </Upload>
        </div> */}
    </>
  );
}

export default App;
