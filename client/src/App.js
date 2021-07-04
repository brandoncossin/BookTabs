import React, {useState} from 'react';
import './App.css';
import NavBar from './components/NavBar';
import BookList from './components/BookList';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import BookItem from './components/BookResult';
import HomePage from './components/HomePage.js';
import Blog from './components/Blog.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  return (
    <Router>
    <div class="container">
      <NavBar/>
      <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/BookList" component={BookList} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/LogIn" component={LogIn} />
      <Route path="/Blog" component={Blog} />
      <Route path="/BookResult" component={BookItem} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
