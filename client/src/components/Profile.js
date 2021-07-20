import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from "react-router";
import {Link} from "react-router-dom";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      name: "",
      myList: [],
    }
    this.handleRemove = this.handleRemove.bind(this);
  }
  
  componentDidMount() {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token')
      axios.get("http://localhost:8080/profile", {
        params: {
          token: token
        }
      })
        .then(data => {
          this.setState({ uid: data.data.profile.uid })
          this.setState({ name: data.data.profile.name })
          this.setState({ myList: data.data.profile.myList })
          console.log(this.state.myList)
        });
    }
  }
  handleRemove (i, e){
    e.preventDefault();
    axios.post("http://localhost:8080/api/remove", 
    {uid: this.state.uid, book: this.state.myList[i]}, 
    {headers: {"Content-Type": "application/json"}})
    .then((res) => {
      if(res.data.status !== 'error'){
        document.getElementById("removeDiv" + i).innerHTML = "Removed";
      }
      else{
        document.getElementById("removeDiv" + i).innerHTML = "Error";
      }
    })     
  }
  render() {
    return (
      <div className="ProfileContainer">
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
              <th scope="col">Remove From List</th>
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
                    as={Link} to={{pathname: '/BookResult/', state: {book: book}}} >
                      <img src={`${book.bookImage}`} alt={book.title} />
                      </Link></td>
                      
                    <td><h5><b>{book.bookTitle}</b><br></br>{book.bookAuthor}</h5></td>
                    <td><h5>{book.bookTitle}</h5></td>
                    <td><h5>{book.bookAuthor}</h5></td>
                    <td id={"removeDiv"+ i}><button type="submit" className="btn btn-secondary" 
                    onClick = {(e) => this.handleRemove(i, e)} 
                    name="submit">Remove From List
                    </button>
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