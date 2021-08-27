import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Link
} from "react-router-dom";
import thumbsUpSvg from '../icons/thumbsUpIcon.svg';

function BookList(props) {
  let SearchBeenLoaded = localStorage.getItem("book");
  console.log(props.userMyList)
  console.log(props.userLikedList)
  const [book, setBook] = useState(SearchBeenLoaded);
  let ResultsBeenLoaded = JSON.parse(localStorage.getItem("result") || '[]');
  let SearchToken = localStorage.getItem("InitialSearch");
  //UseEffect runs on site load
  //Checks if tokens for search are set
  useEffect(() => {
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
    /*
    for(let j = 0; j < result.length; j++){
      var button = document.getElementById("addmessage" + j);
        button.className = "mr-4 BookResultButton"
    }
    */
  }, [SearchToken, book]
    
);
const [result, setResult] = useState(ResultsBeenLoaded);
  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }

  function handleAdd(book, i){
    const token = sessionStorage.getItem('token');
    axios.post("http://localhost:8080/api/add", 
    { 
      book: book,
      token: token}, 
    {headers: {"Content-Type": "application/json"}})
    .then((res) => {
      if(res.data.status !== 'error'){
        var button = document.getElementById("addmessage" + i);
        button.className = "AddedListButton mr-4"
        button.innerHTML = "<span style=\" color: transparent; text-shadow: 0 0 0 #ff3527; background: white;\">&#10004;</span>Added To List"
      }
      else{
        document.getElementById("addmessage" + i).innerHTML = res.data.error;
      }
    })     
  }
  function handleLike(book, i){
    const token = sessionStorage.getItem('token');
    axios.post("http://localhost:8080/api/like", 
    { 
      book: book,
      token: token}, 
    {headers: {"Content-Type": "application/json"}})
    .then((res) => {
      if(res.data.status !== 'error'){
        var button = document.getElementById("likemessage" + i);
        button.className = "AddedListButton mr-4"
        button.innerHTML = "<span style=\" color: red; text-shadow: 0 0 0 #ff3527; background: white;\">&#9829;</span> Liked"
      }
      else{
        document.getElementById("addmessage" + i).innerHTML = res.data.error;
      }
    })     
  }
  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem("book", book);
    //Location of API call
    axios.get("http://localhost:8080/",{
    //axios.get("https://serene-spire-91674.herokuapp.com/", {
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
        <hr></hr>
        <div className="container">
            {result.map((book, i) => ( 
                 <div className="Book row" key={i}>
                 <div className="BookResultImage col">
                 <Link className="BookResultLink" as={Link} to={{pathname: `/BookResult/${book.bookId}`, 
                  state: {
                  book : book,
                  isLoggedIn: props.isLoggedIn,
                  inUserMyList: props.userMyList.some(thebook => thebook.bookId === book.bookId),
                  inUserLikedList: props.userLikedList.some(thebook => thebook.bookId === book.bookId),
                  }}} >
                    <img src={book.bookImage} alt={book.bookTitle} />
                       </Link>
                  </div>
                 <div className="BookResultInformation col">
                 <h2><b><Link className="BookResultLink" as={Link} to={{pathname: `/BookResult/${book.bookId}`, 
                  state: {
                  book : book,
                  isLoggedIn: props.isLoggedIn,
                  inUserMyList: props.userMyList.some(thebook => thebook.bookId === book.bookId),
                  inUserLikedList: props.userLikedList.some(thebook => thebook.bookId === book.bookId),
                  }}} >
                      {book.bookTitle}
                      </Link>
                      </b></h2>
                      <h5>{book.bookAuthor.map((author) => (
                      <Link className="BookResultLink" 
                      as={Link} to={{pathname: `/AuthorList/${author}`, state: {author: author, isLoggedIn: true}}}>
                        {author} </Link>
                    ))}</h5>
                 
                 
                 {props.isLoggedIn && (
                 <div className="BookResultInformation row ">
                   {props.userMyList.some(thebook => thebook.bookId === book.bookId) ? 
                   <div id={"reviewmessage"}>
                           <button className="mr-4 AddedListButton" >  
                           Inside List
                           </button>
                           </div>
                   : <div id={"reviewmessage"}>
                           <button type="submit" className="mr-4 BookResultButton" 
                           name="submit"
                           id={"addmessage"+ i}
                           onClick = {() => {
                            handleAdd(book, i);
                          }} >  
                           Add To List
                           </button>
                           </div> }
                           {props.userLikedList.some(thebook => thebook.bookId === book.bookId) ? 
                   <div id={"reviewmessage"}>
                           <button className="mr-4 AddedListButton" >  
                           <span style= {{color: 'red', textShadow: '0 0 0 #ff3527', background: 'white'}}>&#9829;</span> Liked
                           </button>
                           </div>
                           : <div id={"reviewmessage"}>
                           <button type="submit" className="mr-4 BookResultButton" 
                           name="submit"
                           id={"likemessage"+ i}
                           onClick = {() => {
                            handleLike(book, i);
                          }} >  
                          <span style={{color: 'white', textShadow: '0 0 0 #ff3527', background: 'transparent', height: '25px'}}>		
                          &#9829; Like Book</span>
                           </button>
                           </div>
                           } 
                           </div>
                           )}
                 </div>
                 </div>
            ))}
      </div>
      </div>
    );
}

export default BookList;