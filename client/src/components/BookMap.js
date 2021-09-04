import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Link
} from "react-router-dom";

function BookMap (props){
  console.log(props.userMyList)
    function handleAdd(book, i){
        const token = sessionStorage.getItem('token');
        axios.post("http://localhost:8080/api/add", 
        //axios.post("https://serene-spire-91674.herokuapp.com/api/add",
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
      function handleRemove(book, i){
        const token = sessionStorage.getItem('token');
        axios.post("http://localhost:8080/api/remove", 
        //axios.post("https://serene-spire-91674.herokuapp.com/api/remove", 
        {token: token, 
          book: book}, 
        {headers: {"Content-Type": "application/json"}})
        .then((res) => {
          if(res.data.status !== 'error'){
            var button = document.getElementById("removemessage" + i);
            button.className = "AddedListButton mr-4"
            button.innerHTML = "<span style=\" color: transparent; text-shadow: 0 0 0 #ff3527; background: white;\">&#10004;</span>Removed From List"
              }
          else{
            document.getElementById("addmessage" + i).innerHTML = res.data.error;
          }
        })     
      }
      function handleLike(book, i){
        const token = sessionStorage.getItem('token');
        axios.post("http://localhost:8080/api/like",
        //axios.post("https://serene-spire-91674.herokuapp.com/api/like", 
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
      function handleUnlike(book, i){
        const token = sessionStorage.getItem('token');
        axios.post("http://localhost:8080/api/unlike", 
        //axios.post("https://serene-spire-91674.herokuapp.com/api/unlike", 
        {token: token, 
          book: book}, 
        {headers: {"Content-Type": "application/json"}})
        .then((res) => {
          if(res.data.status !== 'error'){
            var button = document.getElementById("unlikemessage" + i);
            button.className = "AddedListButton mr-4"
            button.innerHTML = "<span style=\" color: red; text-shadow: 0 0 0 #ff3527; background: transparent;\">&#128148;</span>Unliked"
              }
          else{
            document.getElementById("addmessage" + i).innerHTML = res.data.error;
          }
        })     
      }

 
  
    return <div className="container">
    {props.books.map((book, i) => ( 
         <div className="Book row" key={i}>
         <div className="BookResultImage col">
         <Link className="BookResultLink" as={Link} to={{pathname: `/BookResult/${book.bookId}`, 
          state: {
          book : book,
          isLoggedIn: props.isLoggedIn,
          userMyList: props.userMyList,
          inUserLikedList: props.userLikedList,
          }}} >
            <img src={book.bookImage} alt={book.bookTitle} />
               </Link>
          </div>
         <div className="BookResultInformation col">
         <h2><b><Link className="BookResultLink" as={Link} to={{pathname: `/BookResult/${book.bookId}`, 
          state: {
          book : book,
          isLoggedIn: props.isLoggedIn,
          userMyList: props.userMyList,
          inUserLikedList: props.userLikedList,
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
           <button type="submit" 
           className="mr-4 BookResultButton"
           id={"removemessage"+ i}
           onClick = {() => {
            handleRemove(book, i);
                }} 
           name="submit">Remove From List
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
                   <button className="mr-4 BookResultButton" 
                   id={"unlikemessage"+ i}
                    onClick = {() => {
                  handleUnlike(book, i);
                  }} 
                  name="submit" >  
                   <span style= {{color: 'white', textShadow: '0 0 0 #ff3527', background: 'transparent'}}>&#128148;</span> Unlike
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
                  &#128150; Like Book</span>
                   </button>
                   </div>
                   } 
                   </div>
                   )}
         </div>
         </div>
    ))}
</div>
  
  
}
export default BookMap;