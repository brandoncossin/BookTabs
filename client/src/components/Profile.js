import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from "react-router";
import {Link, Redirect} from "react-router-dom";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      name: "",
      myList: [],
      likedList: [],
    }
    this.handleRemove = this.handleRemove.bind(this);
  };
  componentDidMount() {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token')
      axios.get("http://localhost:8080/profile", 
     // axios.get("https://serene-spire-91674.herokuapp.com/profile",
      {
        params: {
          token: token
        }
      })
        .then(data => {
          this.setState({ uid: data.data.profile.uid, name: data.data.profile.name,
            myList: data.data.profile.myList, likedList: data.data.profile.likedList});
        });
    }
    else{
      <Redirect to={{pathname: "/" }} />
      window.location.reload();  
    }
  }
  handleRemove (i, e){
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    axios.post("http://localhost:8080/api/remove", 
    //axios.post("https://serene-spire-91674.herokuapp.com/api/remove", 
    {token: token, book: this.state.myList[i]}, 
    {headers: {"Content-Type": "application/json"}})
    .then((res) => {
      if(res.data.status !== 'error'){
        var button = document.getElementById("removemessage" + i);
            button.className = "AddedResultButton mr-4";
            button.innerHTML = "Removed"
            button.onClick = null }
      else{
        document.getElementById("removeDiv" + i).innerHTML = "Error";
      }
    })     
  }
  handleUnlike (i, e){
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    axios.post("http://localhost:8080/api/unlike",
    //axios.post("https://serene-spire-91674.herokuapp.com/api/unlike",  
    {token: token, book: this.state.likedList[i]}, 
    {headers: {"Content-Type": "application/json"}})
    .then((res) => {
      if(res.data.status !== 'error'){
        var button = document.getElementById("unlikemessage" + i);
            button.className = "AddedResultButton mr-4";
            button.innerHTML = "Unliked"
            button.onClick = null }
      else{
        document.getElementById("removeDiv" + i).innerHTML = "Error";
      }
    })     
  }
  render() {
    return (
      <div className="container-fluid">
        <h1>{this.state.uid}'s List</h1>
        <hr></hr>
        <div className="ProfileContainer">
        <table className="table ml-0">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Cover</th>
              <th scope="col">Title/Author</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {this.state.myList.length === 0 && (
              <p>No matching items!</p>
            )}
            {this.state.myList.map((book, i) => (
          
                  <tr key={i}>
                    <td className="ProfileBookList ">
                    <Link className="BookResultLink" 
                    as={Link} to={{pathname: `/BookResult/${book.bookId}`, state: {book: book, isLoggedIn: true}}} >
                      <img src={`${book.bookImage}`} alt={book.title} />
                      </Link></td>
                      
                    <td><h5><b>{book.bookTitle}</b><br></br>{book.bookAuthor}</h5></td>
                    <td><h5> <Link className="BookResultLink" 
                    as={Link} to={{pathname: `/BookResult/${book.bookId}`, state: {book: book, isLoggedIn: true}}} >
                      {book.bookTitle}</Link></h5></td>
                    <td>{book.bookAuthor.map((author) => (
                      <h5><Link className="BookResultLink" 
                      as={Link} to={{pathname: `/AuthorList/${author}`, state: {author: author, isLoggedIn: true}}}>
                        {author}</Link></h5>
                    ))}</td>
                    <td><div id={"removeDiv"+ i}>
                      <button type="submit" 
                      className="HomeButton" 
                      id={"removemessage"+ i}
                      onClick = {(e) => this.handleRemove(i, e)} 
                      name="submit">Remove From List
                    </button>
                    </div>
                    </td>
                  </tr>

                  
            ))}
          </tbody>
        </table>
        </div>
        <h1>Liked Books</h1>
        <div className="ProfileContainer">
        <table className="table ml-0">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Cover</th>
              <th scope="col">Title/Author</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Unlike</th>
            </tr>
          </thead>
          <tbody>
            {this.state.likedList.length === 0 && (
              <p>No matching items!</p>
            )}
            {this.state.likedList.map((book, i) => (
          
                  <tr key={i}>
                    <td className="ProfileBookList ">
                    <Link className="BookResultLink" 
                    as={Link} to={{pathname: `/BookResult/${book.bookId}`, state: {book: book, isLoggedIn: true}}} >
                      <img src={`${book.bookImage}`} alt={book.title} />
                      </Link></td>
                      
                    <td><h5><b>{book.bookTitle}</b><br></br>{book.bookAuthor}</h5></td>
                    <td><h5> <Link className="BookResultLink" 
                    as={Link} to={{pathname: `/BookResult/${book.bookId}`, state: {book: book, isLoggedIn: true}}} >
                      {book.bookTitle}</Link></h5></td>
                    <td>{book.bookAuthor.map((author) => (
                      <h5><Link className="BookResultLink" 
                      as={Link} to={{pathname: `/AuthorList/${author}`, state: {author: author, isLoggedIn: true}}}>
                        {author}</Link></h5>
                    ))}</td>
                    <td><div id={"removeDiv"+ i}>
                      <button type="submit" 
                      className="HomeButton" 
                      id={"unlikemessage"+ i}
                      onClick = {(e) => this.handleUnlike(i, e)} 
                      name="submit">
                        <span style= {{color: 'white', textShadow: '0 0 0 #ff3527', background: 'transparent'}}>&#128148; Unlike</span>
                    </button>
                    </div>
                    </td>
                  </tr>

                  
            ))}
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);