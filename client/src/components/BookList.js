import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import poweredByGoogle from '../icons/poweredByGoogle.png';
import BookMap from './BookMap';

function BookList(props) {
  let SearchBeenLoaded = localStorage.getItem("book");
  const [book, setBook] = useState(SearchBeenLoaded);
  let ResultsBeenLoaded = JSON.parse(localStorage.getItem("result") || '[]');
  let SearchToken = localStorage.getItem("InitialSearch");
  //UseEffect runs on site load
  //Checks if tokens for search are set
  useEffect(() => {
    if(book !== null && SearchToken === "initialized"){
      axios.get("http://localhost:8080/bookSearch", {
        //axios.get("https://serene-spire-91674.herokuapp.com/bookSearch", {      
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
    const book = event.target.value;
    setBook(book);
  }

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem("book", book);
    //Location of API call
    axios.get("http://localhost:8080/bookSearch",{
    //axios.get("https://serene-spire-91674.herokuapp.com/bookSearch", {
    params: {
    userId: sessionStorage.getItem('token'),
    book: book
  }})
    .then(data => {
      setResult(data.data.items);
      localStorage.setItem("result", JSON.stringify(data.data.items));
      window.location.reload();
    });
  }
  if(book == null){
    return(
      <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
    )
  }
    else 
    {return ( 
      
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
                <img src={poweredByGoogle} className="mr-auto" alt="Powered by Google"></img>
                </form>
      </div>
        <hr></hr>
        <BookMap books={result} 
        userMyList={props.userMyList} 
        userLikedList={props.userLikedList}
        isLoggedIn={props.isLoggedIn}></BookMap>
      </div>
    );}
}

export default BookList;