import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Link,
  Redirect
} from "react-router-dom";

function BookList (props) {
  console.log(props.location.book)
  const [book, setBook] = useState("");
  let ResultsBeenLoaded = JSON.parse(localStorage.getItem("result") || '[]');
  let SearchToken = localStorage.getItem("InitialSearch");
  //UseEffect runs on site load
  //Checks if tokens for search are set
  useEffect(() => {
    if(props.location.state){
      setBook(props.location.state)
    }
    if(props.isLoggedIn){
      console.log("logged in")
    }
    if(book !== null && SearchToken === "initialized"){
      axios.get("http://localhost:8080/", {
      //axios.get("https://serene-spire-91674.herokuapp.com/", {
      params: {
      book: book
    }})
      .then(data => {
        localStorage.setItem("result", JSON.stringify(data.data.items));
        setResult(data.data.items);
      });
      localStorage.setItem("InitialSearch", "");    
    }
  }, [SearchToken, book]
    
);
const [result, setResult] = useState(ResultsBeenLoaded);
  function handleChange(event) {
    setBook(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem("book", book);
    //Location of API call
    axios.get("http://localhost:8080/",{
    //axios.get("https://serene-spire-91674.herokuapp.com/", {
    params: {
    book: book
  }})
    .then(data => {
      setResult(data.data.items);
      localStorage.setItem("result", JSON.stringify(data.data.items));
    });
  }
    return ( 
      <div className="container mt-10">
       <div className="SearchBarRow">
        <form onSubmit={handleSubmit}>
        <input type="text"
              value={book}
              onChange={handleChange}
              className="SearchBar"
              placeholder="Search for Books"
              autoComplete="off">
                </input>
                </form>
      </div>
        <div className="container">
        <hr></hr>
          <div className="row ">
            {result.map(book => (
                <div className="BookResult">  
                <Link className="BookResultLink" as={Link} to={{pathname: '/BookResult/', state: {book: book}}} >
                <div className="row">
                  <div className="BookResultImage ">
                    <img src={
                      book.volumeInfo.imageLinks === undefined ? "" : `${book.volumeInfo.imageLinks.thumbnail}`} alt={book.title} />
                      </div>
                    <div className="BookResultInformation">
                      <h3><b>{book.volumeInfo.title}</b></h3>{book.volumeInfo.authors}
                      {props.isLoggedIn && (
                        <div> Add to List </div>
                      )}
                      </div>
                      </div>
                    </Link>
                    <hr></hr>
                </div>
            ))}
          </div>
        </div>
      </div>
    );
}

export default BookList;