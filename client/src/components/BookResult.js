import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function bookItem(props) {
    const {book, isLoggedIn} = props.location.state;
  //Function adds Book
    function handleAdd(book){
      const token = sessionStorage.getItem('token');
      axios.post("http://localhost:8080/api/add", {book: book, token: token}, 
      {headers: {"Content-Type": "application/json"}})
      .then((res) => {
        if(res.data.status !== 'error'){
          document.getElementById("listmessage").innerHTML = "Added To List";
        }
        else{
          document.getElementById("listmessage").innerHTML = res.data.error;
        }
      })
    }
    //Function Removes book
    function handleRemove (book){
      axios.post("http://localhost:8080/api/remove", 
      {uid: this.state.uid, book: book}, 
      {headers: {"Content-Type": "application/json"}})
      .then((res) => {
        if(res.data.status !== 'error'){
          //document.getElementById("listmessage").style.color = 'red';
          //document.getElementById("listmessage").innerHTML = "Removed from list";
          document.getElementById("listmessage").innerHTML = "Error";

        }
        else{
          document.getElementById("listmessage").innerHTML = "Error";
        }
      })     
    }
    return (
      <div className="container">
        <br></br>
          <div className="row">
          <div className="col">
          <img src={book.bookImage === undefined ? "" : `${book.bookImage}`} alt={book.bookTitle} />
          <hr></hr>
          <p>ISBN 10: {book.bookISBN10}</p>
          <p>ISBN 13: {book.bookISBN13}</p>
          <a target="_blank" rel="noreferrer nofollow" href={book.bookPreviewLink}><p>Link to buy on Google</p></a>
          <a target="_blank" rel="noreferrer nofollow" href={"http://amzn.com/"+ book.bookISBN13}><p>Link to buy on Amazon</p></a>
          <a target="_blank" rel="noreferrer nofollow" href={"https://abebooks.com/servlet/SearchResults?sts=t&isbn=" + book.bookISBN13}><p>Link to buy on Abe Books</p></a>
          </div>
          <div className="col">
          <h1>{book.bookTitle}</h1>
          <h3>{book.bookAuthor.join(', ')}</h3>
          <hr></hr>
          <div>
            <h5>Description</h5>
          <p>
            {book.bookInformation}
          </p>
          </div>
          {isLoggedIn && (
          <div id={"listmessage"}>
                    <button type="submit" className="HomeButton" 
                    onClick = {() => {
                      handleAdd(book);
                    }} 
                    name="submit">Add To List
                    </button>
                    <button type="submit" className="HomeButton" name="submit">Submit a Review</button>
                    </div>
                    )}
          </div>
          </div>
        </div>
      );
}

export default bookItem;