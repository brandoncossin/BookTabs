import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';


export default class LogIn extends React.Component {
  constructor(props){
    super(props);
    this.state = {
            uid : "",
            pwd : ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
//Long validation function, validates whole form.
handleValidation(){
  let formIsValid = true;
  document.getElementById("errormessage").innerHTML = "";
  if(!this.state.uid){
      document.getElementById("errormessage").innerHTML = "**Please enter a username";
      return formIsValid = false;
  }
  if(!this.state.pwd){
      document.getElementById("errormessage").innerHTML = "**Please enter a password";
      return formIsValid = false;
  }
  return formIsValid;
}
handleChange(event) {
    this.setState({[event.target.name] : event.target.value});
  }
handleSubmit(e) {
    e.preventDefault(); 
    if(this.handleValidation()){
    axios.post("http://localhost:8080/api/login", 
    //axios.post("https://serene-spire-91674.herokuapp.com/api/login", 
    this.state, 
    {headers: {"Content-Type": "application/json"}}
        ).then((res) => {
          if(res.data.status !== 'error'){
            sessionStorage.setItem('token', JSON.stringify(res.data.data));
            <Redirect to={{
              pathname: "/" }} />
            window.location.reload();          
          }
          else{
            document.getElementById("errormessage").innerHTML = res.data.error;
          }
    });
  }
}

render(){
  return (
        <div className="container-fluid">
        <section className= "row justify-content-center">
        <form 
        method="post" 
        className="form-container"
        onSubmit={this.handleSubmit}> 
        <h3>Sign in to BookTabs</h3>
        <h6 className="card-subtitle mb-2 text-muted">Welcome back. Sign in with your account.</h6>
        <span id = "errormessage" style ={{color: "red" , background: "transparent"}}></span>
        <p> Username</p>
        <input type="text" autoComplete="off"
        name="uid" placeholder="Type your username" 
        value={this.state.uid} onChange={this.handleChange}></input>
        <p> Password </p>
        <input type="password" autoComplete="off"
        name="pwd" placeholder="Type your password" 
        value={this.state.pwd} onChange={this.handleChange}></input>
        <br></br>
        <button type="submit" className="HomeButton" name="submit">Log In</button>
        <br></br>
        <Link to="/SignUp">Not a member? Sign up today!</Link>
        </form>
      
      </section>
      </div>
    );
}
}
