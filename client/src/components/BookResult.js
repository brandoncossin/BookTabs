import React from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import googlePreview from '../icons/googlePreview.png';
import poweredByGoogle from '../icons/poweredByGoogle.png';

class BookResult extends React.Component{
  constructor(props){
    super(props);
    const {match} = this.props
    this.state = {
      book: props?.location?.state?.book,
      isLoggedIn: this.props.isLoggedIn,
      isLoading: true,
      bookId: match.params.bookId,
      userMyList: props?.location?.state?.userMyList|| this?.props?.userMyList,
      userLikedList: props?.location?.state?.userLikedList|| this?.props?.userLikedList,
      // first element assigned would be a temp passed from book map
      // second element would be from the app js, so if user traverses here
      // from another path besides book
    }
    console.log(this.state.userMyList)
    this.handleAdd = this.handleAdd.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleUnlike = this.handleUnlike.bind(this);
  }
  //Handles adding book to list
  handleAdd(event){
    event.preventDefault();
    const token = sessionStorage.getItem('token');
      axios.post("http://localhost:8080/api/add", 
      //axios.post("https://serene-spire-91674.herokuapp.com/api/add", 
      {book: this.state.book, token: token}, 
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
    const token = sessionStorage.getItem('token');
      axios.post("http://localhost:8080/api/like", 
      //axios.post("https://serene-spire-91674.herokuapp.com/api/like", 
      {book: this.state.book, token: token}, 
      {headers: {"Content-Type": "application/json"}})
      .then((res) => {
        if(res.data.status !== 'error'){
          var button = document.getElementById("likedlistmessage");
          button.className = "AddedResultButton mr-4";
          button.innerHTML = "<span style=\" color: red; text-shadow: 0 0 0 #ff3527; background: white;\">&#9829;</span> Liked"
        }
        else{
          document.getElementById("likedlistmessage").innerHTML = res.data.error;
        }
      })
  }
 // Removes book from My List
 handleRemove(event){
   event.preventDefault();
  const token = sessionStorage.getItem('token');
  axios.post("http://localhost:8080/api/remove", 
  //axios.post("https://serene-spire-91674.herokuapp.com/api/remove", 
  {token: token, 
    book: this.state.book}, 
  {headers: {"Content-Type": "application/json"}})
  .then((res) => {
    if(res.data.status !== 'error'){
      var button = document.getElementById("listmessage");
          button.className = "AddedResultButton mr-4";
        button.innerHTML = "<span style=\" color: transparent; text-shadow: 0 0 0 #ff3527; background: white;\">&#10004;</span>Removed From List"
        }
    else{
      document.getElementById("listmessage").innerHTML = res.data.error;
    }
  })     
}
 // Removes book from My List
 handleUnlike(event){
  event.preventDefault();
 const token = sessionStorage.getItem('token');
 axios.post("http://localhost:8080/api/unlike", 
 //axios.post("https://serene-spire-91674.herokuapp.com/api/unlike", 
 {token: token, 
   book: this.state.book}, 
 {headers: {"Content-Type": "application/json"}})
 .then((res) => {
  if(res.data.status !== 'error'){
    var button = document.getElementById("likedlistmessage");
        button.className = "AddedResultButton mr-4";
      button.innerHTML = "<span style=\" color: red; text-shadow: 0 0 0 #ff3527; background: transparent;\">&#128148;</span> Unliked"
      }
  else{
    document.getElementById("likedlistmessage").innerHTML = res.data.error;
  }
 })     
}
  componentDidMount() {
    if(this.state.book){
      this.setState({isLoading : false})
    }
    else{
       axios.get("http://localhost:8080/book", {
      //axios.get("https://serene-spire-91674.herokuapp.com/book", {
      params: {
      id: this.state.bookId
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
      <div className="container-fluid">
        <br></br>
          <div className="row">
          <div className="BookContainer col">
          <img src={this.state.book.bookImage === undefined ? "" : `${this.state.book.bookImage}`} alt={this.state.book.bookTitle} />
          <hr></hr>
          <p>ISBN 10: {this.state.book.bookISBN10}</p>
          <p>ISBN 13: {this.state.book.bookISBN13}</p>
          
          <a target="_blank" rel="noreferrer nofollow" href={this.state.book.bookPreviewLink}>
          <input type="image" src={googlePreview} style={{
        backgroundColor: 'white', marginRight: ' 50%'} } height="35" alt="Buy on Google"></input>
           <input type="image" style={{
        backgroundColor: 'white' }} src={poweredByGoogle} alt="Powered by Google"></input>

          </a>
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
            {this.state.userMyList.some(thebook => thebook.bookId === this.state.bookId) ?
                  <div className="mr-4" id={"reviewmessage"}>
                    <button type="submit" className="mr-4 HomeButton" 
                    onClick = {this.handleRemove}
                    id={"listmessage"}
                    name="submit">Remove From List
                    </button>
                    </div>
                    :
                    <div className="mr-4" id={"reviewmessage"}>
                    <button type="submit" className="mr-4 HomeButton" 
                    onClick = {this.handleAdd}
                    id={"listmessage"}
                    name="submit">Add To List
                    </button>
                    </div>}
                    {this.state.userLikedList.some(thebook => thebook.bookId === this.state.bookId) ?
                      <div className="" id={"reviewmessage"}>
                    <button type="submit" className="mr-4 HomeButton" 
                    onClick = {this.handleUnlike}
                    id={"likedlistmessage"}
                    name="submit"> 
                    <span style= {{color: 'white', textShadow: '0 0 0 #ff3527', background: 'transparent'}}>&#128148;</span> Unlike</button>
                    </div>
                    :
                    <div className="" id={"reviewmessage"}>
                    <button type="submit" className="mr-4 HomeButton" 
                    onClick = {this.handleLike}
                    id={"likedlistmessage"}
                    name="submit"> 
                    <span style={{color: 'white', textShadow: '0 0 0 #ff3527', background: 'transparent', height: '25px'}}>		
                    &#128150; Like Book</span></button>
                    </div>
      }
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