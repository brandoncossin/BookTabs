import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';
import NavBar from './components/NavBar';
import RecentActivity from './components/RecentActivity';
import BookList from './components/BookList';
import AuthorList from './components/AuthorList';
import ProfileSettings from './components/Settings';
import Destroy from './components/Destroy.js'
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
  const [userMyList, setUserMyList] = useState([]);
  const [userLikedList, setUserLikedList] = useState([]);
  //Use Effect to launch on page load
  useEffect(() => {
    if (sessionStorage.getItem('token') && !isLoggedIn) {
      const token = sessionStorage.getItem('token')
      axios.get("http://localhost:8080/authCheck", {
        params: {
          token: token
        }
      })
      //If data is authenticated user is logged in
        .then((res) => {
          if (res.data.status !== 'error') {
            SetLoggedIn(true);
            setUserLikedList(res.data.userLikedList)
            setUserMyList(res.data.userMyList)
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
}, [isLoggedIn, userMyList, userLikedList])
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
            <HomePage {...props} 
            isLoggedIn={isLoggedIn} />
          )}/>
          <Route path="/Discover" render={(props) => (
            <RecentActivity {...props} 
            isLoggedIn={isLoggedIn} 
            userMyList={userMyList}/>
          )} />
          <Route path="/BookList" render={(props) => (
            <BookList {...props} 
            isLoggedIn={isLoggedIn} 
            userMyList={userMyList}
            userLikedList={userLikedList}/>
          )} />
          <Route path="/AuthorList/:author" render={(props) => (
            <AuthorList {...props} 
            isLoggedIn={isLoggedIn} 
            userMyList={userMyList}
            userLikedList={userLikedList}/>
          )} />
          <ProtectedRoute path="/Profile" 
          isLoggedIn={isLoggedIn}
            component={Profile} />
          <ProtectedRoute path="/Settings" 
          isLoggedIn={isLoggedIn} 
            component={ProfileSettings} />
            <ProtectedRoute path="/Destroy" 
          isLoggedIn={isLoggedIn} 
            component={Destroy} />
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
          
          <Route path="*" component={() => "404 NOT FOUND"} />

        </Switch>
        <Footer />
          
      </div> 
    </Router>
  );
          }
}

export default App;
