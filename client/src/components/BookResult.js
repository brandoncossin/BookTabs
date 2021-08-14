import React from 'react';
import axios from 'axios';
import {Link, withRouter} from "react-router-dom";

class BookResult extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      book: props?.location?.state?.book,
      isLoggedIn: props?.location?.state?.isLoggedIn,
      isLoading: true,
      bookId: this.props.match.params.id,
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleReview = this.handleReview.bind(this);
  }
  //Handles adding book to list
  handleAdd(event){
    event.preventDefault();
    const token = sessionStorage.getItem('token');
      axios.post("http://localhost:8080/api/add", {book: this.state.book, token: token}, 
      {headers: {"Content-Type": "application/json"}})
      .then((res) => {
        if(res.data.status !== 'error'){
          var button = document.getElementById("listmessage");
          button.className = "AddedResultButton mr-4";
        button.innerHTML = "<span style=\" color: transparent; text-shadow: 0 0 0 #ff3527; background: white;\">&#10004;</span>Added To List"
        }
        else{
          document.getElementById("listmessage").innerHTML = res.data.error;
        }
      })
  }
  //Handles Like
  handleLike(event){
    event.preventDefault();
  }
  //Handles Remove
  handleReview(event){
    event.preventDefault();
  }
  componentDidMount() {
    const { match, location, history } = this.props
    if(this.state.book){
      this.setState({isLoading : false})
    }
    else{
      const bookId = match.params.bookId;
      axios.get("http://localhost:8080/book", {
      //axios.get("https://serene-spire-91674.herokuapp.com/", {
      params: {
      id: bookId
    }})
      .then(data => {
        this.setState({book : data.data});
        this.setState({isLoading : false})
      });
    }
    }
    render(){
      if(this.state.isLoading){
        return <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      }
      else{
    return (
      <div className="container">
        <br></br>
          <div className="row">
          <div className="BookContainer col">
          <img src={this.state.book.bookImage === undefined ? "" : `${this.state.book.bookImage}`} alt={this.state.book.bookTitle} />
          <hr></hr>
          <p>ISBN 10: {this.state.book.bookISBN10}</p>
          <p>ISBN 13: {this.state.book.bookISBN13}</p>
          <a target="_blank" rel="noreferrer nofollow" href={this.state.book.bookPreviewLink}><p>Link to buy on Google</p></a>
          </div>
          <div className="BookContainerInformation col">
          <h1>{this.state.book.bookTitle}</h1>
          <h3>{this.state.book.bookAuthor.join(', ')}</h3>
          <hr></hr>
          
            <h5>Description</h5>
          <p>
            {this.state.book.bookInformation}
          </p>
          
          {this.state.isLoggedIn && (
          <div className="BookContainerInformation row m-auto">
                  <div classname="mr-4" id={"reviewmessage"}>
                    <button type="submit" className="mr-4 HomeButton" 
                    onClick = {this.handleAdd}
                    id={"listmessage"}
                    name="submit">Add To List
                    </button>
                    </div>
                    <div classname="" id={"reviewmessage"}>
                    <Link className="BookResultLink" 
                    as={Link} to={{pathname: '/WriteReview/', state: {book: this.state.book, isLoggedIn: true}}} >
                    <button type="submit" className="mr-4 HomeButton" name="submit">Submit a Review</button>
                    </Link>
                    </div>
                    </div>
                    )}
          </div>
          </div>
        </div>
      );
          }
}
}
export default withRouter(BookResult)