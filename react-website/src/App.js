import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import RENDRAPP from "./components/pages/RENDRAPP";
import AboutUs from './components/pages/AboutUs';
import Home from './components/pages/Home';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/Home' component={Home}/>
          <Route path='/' exact component = {RENDRAPP} />
          <Route path='/aboutus' component={AboutUs}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
