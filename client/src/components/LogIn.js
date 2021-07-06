import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import axios from 'axios';


export default class LogIn extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
handleChange(event) {
    this.setState({[event.target.name] : event.target.value});
  }
handleSubmit(e) {
    e.preventDefault();
    JSON.stringify(this.state)
    console.log(JSON.stringify(this.state))
    axios.post("http://localhost:8080/api/signup", this.state, 
    {headers: {"Content-Type": "application/json"}}
        //axios.get("https://serene-spire-91674.herokuapp.com/api/signup", { 
        ).then(function (response) {
        console.log(response);
    });
}

render(){
  return (
        <div className="container-fluid">
        <section className= "row justify-content-center">
        <form 
        method="post" 
        className="form-container"
        onSubmit={this.handleSubmit}> 
        <h3>Sign in to Book Tabs</h3>
        <h6 className="card-subtitle mb-2 text-muted">Welcome back. Sign in with your account.</h6>
        <p> Username</p>
        <input type="text" name="uid" placeholder="Type your username" 
        value={this.state.uid} onChange={this.handleChange}></input>
        <p> Password </p>
        <input type="password" name="pwd" placeholder="Type your password" 
        value={this.state.pwd} onChange={this.handleChange}></input>
        <br></br>
        <button type="submit" className="btn btn-secondary" name="submit">Log In</button>
        <br></br>
        <Link to="/SignUp">Not a member? Sign up today!</Link>
        </form>
      
      </section>
      </div>
    );
}
}
