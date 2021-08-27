import React from 'react';
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Settings extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      name: "",
      email: "",
      myList: [],
      likedList: [],
    }
  };
  componentDidMount() {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token')
      axios.get("http://localhost:8080/profile", {
        params: {
          token: token
        }
      })
        .then(data => {
          this.setState({ uid: data.data.profile.uid, 
            name: data.data.profile.name, myList: data.data.profile.myList, likedList: data.data.profile.likedList,
            email: data.data.profile.email, dateCreated : data.data.profile.dateCreated});
        });
    }
    else{
      <Redirect to={{pathname: "/" }} />
      window.location.reload();  
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <form 
        method="post" 
        className="form-container">
          <h1>Account Information</h1> 
        <h1>{this.state.name}</h1>
        <hr></hr>
        <h5> <b>Email:</b> {this.state.email}</h5>
        <h5> <b>Username:</b> {this.state.uid}</h5>
        <h5> <b>Account Created On:</b> {this.state.dateCreated}</h5>
        <Link as={Link} to="/Profile" ><h5> MyList: ({this.state.myList.length})</h5>
        </Link>
        <Link as={Link} to="/Profile" ><h5> Liked Books: ({this.state.likedList.length})</h5>
        </Link>
        <br></br>
        
        <Link as={Link} to="/Destroy">
        <span id = "errormessage" style ={{color: "red" , background: "transparent"}}>Delete Account</span>
        </Link>
        <br></br>
        </form>
      
      </div>
      );
    }
  }
