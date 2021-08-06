import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import WriteReview from './components/WriteReview.js'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  const [isLoggedIn, SetLoggedIn] = useState(false);
  //This prevents the site from routing before the user
  //is marked as authenticated or not
  const [isLoading, setIsLoading] = useState(true);
  //Use Effect to launch on page load
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token')
      console.log(token);
      axios.get("http://localhost:8080/authCheck", {
        params: {
          token: token
        }
      })
      //If data is authenticated user is logged in
        .then((res) => {
          if (res.data.status !== 'error') {
            console.log(res.data.data);
            SetLoggedIn(true);
            setIsLoading(false);
          }
          else {
            window.location.href = "/";
            alert(res.data.error);
            sessionStorage.removeItem('token');
            window.location.reload();
            setIsLoading(false);
          }
        });
    }
  else{
    setIsLoading(false);
  }
}, [isLoading])
  //If loading is incomplete renders a spinner
  if(isLoading){
    return <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  }
  else{
  return (

    <Router>
      <div className="container">
        
        <NavBar isLoggedIn={isLoggedIn} />
        <Switch>
        
          <Route exact path="/" render={(props) => (
            <HomePage {...props} isLoggedIn={isLoggedIn} />
          )}/>
          <Route path="/BookList" render={(props) => (
            <BookList {...props} isLoggedIn={isLoggedIn} />
          )} />
          <ProtectedRoute path="/Profile" 
          isLoggedIn={isLoggedIn}
            component={Profile} />
          <ProtectedRoute path="/SignUp" isLoggedIn={!isLoggedIn}
            component={SignUp} />
          <ProtectedRoute path="/LogIn" isLoggedIn={!isLoggedIn}
            component={LogIn} />
          <Route path="/Blog" render={(props) => (
            <Blog {...props} isLoggedIn={isLoggedIn} />
          )}
          />
          <Route path="/BookResult/:bookId" render={(props) => (
          <BookItem {...props} isLoggedIn={isLoggedIn} />
          )}/>
          <Route path="/WriteReview" isLoggedIn={isLoggedIn} component={WriteReview} />
          <Route path="*" component={() => "404 NOT FOUND"} />

        </Switch>
        <Footer />
          
      </div> 
    </Router>
  );
          }
}

export default App;
