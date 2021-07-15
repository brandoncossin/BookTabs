import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from "react-router";

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
        document.getElementById("removemessage" + i).innerHTML = "Removed";
      }
      else{
        document.getElementById("removemessage" + i).innerHTML = "Error";
      }
    })     
  }
  render() {
    return (
      <div className="ProfileContainer">
        <h1>Welcome {this.state.uid}</h1>
        <hr></hr>
        <h3>My List</h3>
        <div className="ProfileContainer">
        <table className="table ml-0">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Cover</th>
              <th scope="col">Title/Author</th>
              <th scope="col">Date Added</th>
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
                      <img src={`${book.bookImage}`} alt={book.title} /></td>
                    <td><h5><b>{book.bookTitle}</b><br></br>{book.bookAuthor}</h5></td>
                    <td>Data Added</td>
                    <td><button type="submit" className="btn btn-secondary" 
                    onClick = {(e) => this.handleRemove(i, e)} 
                    name="submit">Remove From List
                    </button>
                    <span id = {"removemessage"+ i} style ={{color: "black" , background: "transparent"}}>
                      </span></td>
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