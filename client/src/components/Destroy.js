import React, { useEffect, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


export default class Destroy extends React.Component{
  constructor(props){
    super(props);
    this.state = {
            uid : "",
            pwd : "",
            token: "",
            isLoading: true,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

  //Use Effect to launch on page load
  componentDidMount() {
    if (this.state.isLoading) {
      const token = sessionStorage.getItem('token')
      axios.get("http://localhost:8080/deleteCheck", {
        params: {
          token: token
        }
      })
      //If data is authenticated user is logged in
        .then((res) => {
          if (res.data.status !== 'error') {
            this.setState({token: token, uid: res.data.uid, isLoading : false});
          }
          else {
            window.location.href = "/";
            alert(res.data.error);
            sessionStorage.removeItem('token');
            window.location.reload();
            this.setState({isLoading : false});
          }
        });
    }
  else{
    this.setState({isLoading : false});
  }
}
handleChange(event) {
  this.setState({[event.target.name] : event.target.value});
}
handleValidation(){
  let formIsValid = true;
  document.getElementById("errormessage").innerHTML = "";
  if(!this.state.uid){
    window.location.href = "/";
    sessionStorage.removeItem('token');
    window.location.reload();
  }
  if(!this.state.pwd){
      document.getElementById("errormessage").innerHTML = "**Please enter your password";
      return formIsValid = false;
  }
  return formIsValid;
}
handleSubmit(e){
    e.preventDefault();
    if(this.handleValidation()){
      axios.post("http://localhost:8080/api/destroy", 
      //axios.post("https://serene-spire-91674.herokuapp.com/api/destroy", 
      this.state, 
      {headers: {"Content-Type": "application/json"}}
          ).then((res) => {
            if(res.data.status !== 'error'){
              alert("Account successfully deleted");
              sessionStorage.removeItem('token');
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
  //If loading is incomplete renders a spinner
  if(this.state.isLoading){
    return <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  }
  
  else{
  return (
    <section className="container-fluid ">
        <form method="post" className="form-container" 
        onSubmit={this.handleSubmit}>
            <h3>Delete Account?</h3>
            <h6 className="card-subtitle mb-2 text-muted text-center">You'll permanently lose your: </h6>
            <h6 className="card-subtitle mb-2 text-muted">&nbsp;&nbsp; &nbsp;&nbsp;    - Account </h6>
            <h6 className="card-subtitle mb-2 text-muted "> &nbsp;&nbsp; &nbsp;&nbsp;    - Saved Books </h6>
            <h6 className="card-subtitle mb-2 text-muted "> &nbsp;&nbsp; &nbsp;&nbsp;    - Liked Books </h6>
            <span id = "errormessage" style ={{color: "red" , background: "transparent"}}></span>
            <p>Your Password</p>
            <input type="password" name="pwd"  autoComplete="off"
             placeholder="Type your password" value={this.state.pwd} onChange={this.handleChange}></input>
            
            <br></br>
            <button type="submit" className="HomeButton" name="submit">Delete My Account</button>
            <br></br>
        </form>
</section>
  )}
}
}
