import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import NavBar from './components/NavBar';
import BookList from './components/BookList';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import BookItem from './components/BookResult';
import HomePage from './components/HomePage.js';
import Profile from './components/Profile.js'
import Blog from './components/Blog.js'
import Footer from './components/Footer.js'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
function App() {
  const[isLoggedIn, SetLoggedIn] = useState(false);
  useEffect(() => {
    if(sessionStorage.getItem('token')){
      const token = sessionStorage.getItem('token')
      console.log(token);
      axios.get("http://localhost:8080/authCheck",{
    params: {
    token: token
  }})
  .then((res) => {
    if(res.data.status !== 'error'){
      console.log(res.data.data); 
      SetLoggedIn(true);         
    }
    else{
        window.location.href = "/";
        alert(res.data.error);
        sessionStorage.removeItem('token');
        window.location.reload();
    }
});
    }
  }
  )
  return (
    <Router>
    <div className="container">
      <NavBar isLoggedIn={isLoggedIn}/>
      <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/BookList" component={BookList} />
      <Route path="/Profile" isLoggedIn={isLoggedIn} 
      component={Profile} />
      <Route path="/SignUp" isLoggedIn={isLoggedIn} 
      component={SignUp} />
      <Route path="/LogIn" isLoggedIn={isLoggedIn} 
      component={LogIn} />
      <Route path="/Blog" component={Blog} />
      <Route path="/BookResult" component={BookItem} />
      <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
