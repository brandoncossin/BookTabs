import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function WriteReview(props) {
    const {book} = props.location.state;
    return (
      <div className="container-fluid">
        <section className= "row justify-content-center">
        <form 
        method="post" 
        className="form-container"> 
        <h3>Add review for</h3>
        <h3>{book.bookTitle} by {book.bookAuthor}</h3>
        <span id = "errormessage" style ={{color: "red" , background: "transparent"}}></span>
        <p> What did you think?</p>
        <textarea >
        </textarea>
        <br></br>
        <button type="submit" className="HomeButton" name="submit">Submit</button>
        <br></br>
        </form>
      
      </section>
      </div>
      );
}

export default WriteReview;