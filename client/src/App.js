import './App.css';
import React from 'react';
import { Route } from "react-router-dom";
import Landing from './components/Landing-Page/Landing-Page';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import Form from './components/Form/Form';
import CountryDetail from './components/CountryDetail/CountryDetail';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Landing}/>
      <Route path='/home' component={Nav}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/home/form' component={Form}/>
      <Route exact path='/home/countries/:id' component={ CountryDetail }/>
    </div>
  );
}

export default App;
