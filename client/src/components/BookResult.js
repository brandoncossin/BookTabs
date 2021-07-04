import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function bookItem(props) {
    const {book} = props.location.state;
    //const { foo } = params;
    return (
      <div class="container">
        <br></br>
          <h1>{book.volumeInfo.title}</h1>
          
          <hr></hr>
          <div class="row">
          <div class="col">
          <img src={book.volumeInfo.imageLinks === undefined ? "" : `${book.volumeInfo.imageLinks.thumbnail}`} alt={book.title} />
          <a target="_blank" href={book.volumeInfo.previewLink}><p>Link to buy on Google</p></a>
          <a target="_blank" href={"http://amzn.com/"+ book.volumeInfo.industryIdentifiers[0].identifier}><p>Link to buy on Amazon</p></a>
          <a target="_blank" href={"https://abebooks.com/servlet/SearchResults?sts=t&isbn=" + book.volumeInfo.industryIdentifiers[0].identifier}><p>Link to buy on Abe Books</p></a>
          </div>
          <div class="col">
          <p>
            {book.volumeInfo.description}
          </p>
          </div>
          </div>
        </div>
      );
}

export default bookItem;