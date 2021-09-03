//This Page is a copy of the BookList Component
//Since Google Book API requires a difference between
//Author and Book This page will be used for Author pages where
//It is applicable
import React, { useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect, useParams } from "react-router-dom";
import poweredByGoogle from '../icons/poweredByGoogle.png';
import BookMap from './BookMap';
export default function AuthorList(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState([]);
  const { author } = useParams();
  //UseEffect runs on site load
  //Checks if tokens for search are set
  useEffect(() => {
    if(!props){
      <Redirect to={{
        pathname: "/" }} />
    }
    if(isLoading){
      console.log(author)
      axios.get("http://localhost:8080/authorBook", {
      //axios.get("https://serene-spire-91674.herokuapp.com/authorBook", {
      params: {
      author: author,
    }})
      .then(data => {
        localStorage.setItem("result", JSON.stringify(data.data.items));
        setResult(data.data.items);
      });
      setIsLoading(false)    
    }
  }, [result, isLoading, props, author]);

    return ( 
      <div className="container mt-10">
       <div className="AuthorHeader">
        
          <h3>Books by {author} </h3>
          <img src={poweredByGoogle} alt="Powered by Google"></img>
        </div>
        <hr></hr>
        <BookMap books={result} 
        userMyList={props.userMyList} 
        userLikedList={props.userLikedList}
        isLoggedIn={props.isLoggedIn}></BookMap>
      </div>
    );
}

