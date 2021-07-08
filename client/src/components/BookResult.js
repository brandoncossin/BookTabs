import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function bookItem(props) {
    const {book} = props.location.state;
    console.log(book)
    return (
      <div className="container">
        <br></br>
          <div className="row">
          <div className="col">
          <img src={book.volumeInfo.imageLinks === undefined ? "" : `${book.volumeInfo.imageLinks.thumbnail}`} alt={book.title} />
          <p>ISBN 10: {book.volumeInfo.industryIdentifiers[1].identifier}</p>
          <p>ISBN 13: {book.volumeInfo.industryIdentifiers[0].identifier}</p>
          <a target="_blank" rel="noreferrer nofollow" href={book.volumeInfo.previewLink}><p>Link to buy on Google</p></a>
          <a target="_blank" rel="noreferrer nofollow" href={"http://amzn.com/"+ book.volumeInfo.industryIdentifiers[0].identifier}><p>Link to buy on Amazon</p></a>
          <a target="_blank" rel="noreferrer nofollow" href={"https://abebooks.com/servlet/SearchResults?sts=t&isbn=" + book.volumeInfo.industryIdentifiers[0].identifier}><p>Link to buy on Abe Books</p></a>
          </div>
          <div className="col">
          <h1>{book.volumeInfo.title}</h1>
          <h3>by: {book.volumeInfo.authors[0]}</h3>
          <hr></hr>
          <p>
            {book.volumeInfo.description}
          </p>
          </div>
          </div>
        </div>
      );
}

export default bookItem;