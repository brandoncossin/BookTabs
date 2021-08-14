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
        var button = document.getElementById("addmessage" + i);
        button.className = "AddedListButton mr-4"
        button.innerHTML = "Added To List"
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
                <div className="Book row" key={1}>
                <div className="BookResultImage col">
                <Link className="BookResultLink" as={Link} to={{pathname: `/BookResult/${book.bookId}`, 
                 state: {
                 book : book,
                 isLoggedIn: props.isLoggedIn
                 }}} >
                   <img src={book.bookImage} alt={book.bookTitle} />
                      </Link>
                 </div>
                <div className="BookResultInformation col">
                <h2><b><Link className="BookResultLink" as={Link} to={{pathname: `/BookResult/${book.bookId}`, state: {book: book}}} >
                     {book.bookTitle}
                     </Link>
                     </b></h2>
                     <h5>{book.bookAuthor.map((author) => (
                     <Link className="BookResultLink" 
                     as={Link} to={{pathname: `/AuthorList/${author}`, state: {author: author, isLoggedIn: true}}}>
                       {author}</Link>
                   ))}</h5>
                
                
                {props.isLoggedIn && (
                 <div className="BookResultInformation row ">
                         <div classname="mr-4" id={"reviewmessage"}>
                           <button type="submit" className="mr-4 BookResultButton" 
                           name="submit"
                           id={"addmessage"+ i}
                           onClick = {() => {
                            handleAdd(book, i);
                          }} >Add To List
                           </button>
                           </div>
                           <div classname="" id={"reviewmessage"}>
                           <Link className="BookResultLink" 
                           as={Link} to={{pathname: '/WriteReview/', state: {book: book, isLoggedIn: true}}} >
                           <button type="submit" className="BookResultButton" name="submit">Submit a Review</button>
                           </Link>
                           </div>
                           </div>
                           )}
                </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    );
}

export default AuthorList;