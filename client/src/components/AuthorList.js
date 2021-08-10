//This Page is a copy of the BookList Component
//Since Google Book API requires a difference between
//Author and Book This page will be used for Author pages where
//It is applicable
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, Redirect} from "react-router-dom";

function AuthorList(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState([]);
  //UseEffect runs on site load
  //Checks if tokens for search are set
  useEffect(() => {
    if(!props){
      <Redirect to={{
        pathname: "/" }} />
    }
    if(isLoading){
      axios.get("http://localhost:8080/authorBook", {
      //axios.get("https://serene-spire-91674.herokuapp.com/", {
      params: {
      author: props?.location?.state?.author,
    }})
      .then(data => {
        localStorage.setItem("result", JSON.stringify(data.data.items));
        setResult(data.data.items);
      });
      setIsLoading(false)    
    }
  }, [result]);

  function handleAdd(book, i){
    const token = sessionStorage.getItem('token');
    axios.post("http://localhost:8080/api/add", 
    { book: book,
      token: token}, 
    {headers: {"Content-Type": "application/json"}})
    .then((res) => {
      if(res.data.status !== 'error'){
        document.getElementById("addmessage" + i).innerHTML = "Added To List";
      }
      else{
        document.getElementById("addmessage" + i).innerHTML = res.data.error;
      }
    })     
  }
    return ( 
      <div className="container mt-10">
        <div className="container">
          <h3>Books by {props?.location?.state?.author}</h3>
        <hr></hr>
          <div className="row ">
            {result.map((book, i) => ( 
                <div className="BookResult" key={i}>  
                <div className="row">
                  <div className="BookResultImage ">
                    {/*
                    Link to Result/Individual Book Page.
                    Sents over individual components as the prop
                    */}
                  <Link className="BookResultLink" as={Link} to={{pathname: `/BookResult/${book.bookId}`, 
                  state: {
                  book : book,
                  isLoggedIn: props.isLoggedIn
                  }}} >
                    <img src={book.bookImage} alt={book.bookTitle} />
                       </Link>
                      </div>
                    <div className="BookResultInformation">
                    <Link className="BookResultLink" as={Link} to={{pathname: `/BookResult/${book.bookId}`, state: {book: book}}} >
                      <h3><b>{book.bookTitle}</b>
                      </h3>
                      <h5>{book.bookAuthor.join(', ')}</h5>
                      </Link>
                      
                      <br></br>
                      <br></br>
                      
                      {props.isLoggedIn && (
                       <div id={"addmessage"+ i}>
                    <button type="submit" className="btn btn-secondary" 
                    onClick = {() => {
                      handleAdd(book, i);
                    }} 
                    name="submit">Add To List
                    </button>
                    </div>
                    )}
                      </div>
                      </div> 
                      
                    <hr></hr>
                </div>
                
            ))}
          </div>
        </div>
      </div>
    );
}

export default AuthorList;