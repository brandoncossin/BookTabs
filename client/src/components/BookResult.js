import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function bookItem(props) {
    const {book} = props.location.state;
    return (
      <div className="container">
        <br></br>
          <h1>{book.volumeInfo.title}</h1>
          
          <hr></hr>
          <div className="row">
          <div className="col">
          <img src={book.volumeInfo.imageLinks === undefined ? "" : `${book.volumeInfo.imageLinks.thumbnail}`} alt={book.title} />
          <a target="_blank" rel="noreferrer nofollow" href={book.volumeInfo.previewLink}><p>Link to buy on Google</p></a>
          <a target="_blank" rel="noreferrer nofollow" href={"http://amzn.com/"+ book.volumeInfo.industryIdentifiers[0].identifier}><p>Link to buy on Amazon</p></a>
          <a target="_blank" rel="noreferrer nofollow" href={"https://abebooks.com/servlet/SearchResults?sts=t&isbn=" + book.volumeInfo.industryIdentifiers[0].identifier}><p>Link to buy on Abe Books</p></a>
          </div>
          <div className="col">
          <p>
            {book.volumeInfo.description}
          </p>
          </div>
          </div>
        </div>
      );
}

export default bookItem;