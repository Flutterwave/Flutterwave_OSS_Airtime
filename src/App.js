import React from 'react';
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import Home from './components/Home'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";



function App() {
  return (
    <BrowserRouter> 
      <Switch> 
        <Route exact path="/" component={Home} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
   
  );
}

export default App;
