import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Home from "./components/pages/Home";
import AboutUs from './components/pages/AboutUs';
import HowToUse from './components/pages/HowToUse';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/' exact component = {Home} />
          <Route path='/aboutus' component={AboutUs}/>
          <Route path='/howtouse' component={HowToUse}/>
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
