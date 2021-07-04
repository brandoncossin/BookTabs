import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

function BookList(props) {
  let SearchBeenLoaded = localStorage.getItem("book");
  const [book, setBook] = useState(SearchBeenLoaded);
  let ResultsBeenLoaded = JSON.parse(localStorage.getItem("result") || '[]');
  let SearchToken = localStorage.getItem("InitialSearch");
  console.log(ResultsBeenLoaded)
  useEffect(() => {
    if(book !== null && SearchToken == "initialized"){

      axios.get("http://localhost:8080/", {
      params: {
      book: book
    }})
      .then(data => {
        localStorage.setItem("result", JSON.stringify(data.data.items));
        setResult(data.data.items);
      });
      localStorage.setItem("InitialSearch", "");    
    }
    
  }, []
    
);
const [result, setResult] = useState(ResultsBeenLoaded);
  //const [apiKey, setApiKey] = useState("AIzaSyBm-Omi3o6U4tNvT445DyT-eH4suqeDYTs");
  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem("book", book);
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
  //If nothing is input, returns the homepage
    return ( 
      <div class="container mt-10">
       <div class="SearchBarRow">
        <form onSubmit={handleSubmit}>
        <input type="text"
              onChange={handleChange}
              className="SearchBar"
              placeholder="Search for Books"
              autoComplete="off">
                </input>
                </form>
      </div>
        <div class="container">
        <hr></hr>
          <div class="row ">
            {result.map(book => (
              
                <div class="BookResult">
                  
                <Link class="BookResultLink" as={Link} to={{pathname: '/BookResult/', state: {book: book}}} >
                <div class="row">
                  <div class="BookResultImage ">
                    <img src={
                      book.volumeInfo.imageLinks === undefined ? "" : `${book.volumeInfo.imageLinks.thumbnail}`} alt={book.title} />
                      </div>
                    <div class="BookResultInformation">
                      <h3><b>{book.volumeInfo.title}</b></h3>{book.volumeInfo.authors}
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