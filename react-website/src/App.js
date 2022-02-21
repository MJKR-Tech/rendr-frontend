import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import { Upload } from "./components/Upload";
import Home from "./components/pages/Home";
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import Signup from './components/pages/Signup';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/' exact component = {Home} />
          <Route path='/services' component={Services}/>
          <Route path='/products' component={Products}/>
          <Route path='/signup' component={Signup}/>
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
