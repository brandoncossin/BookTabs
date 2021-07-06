import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
const LogIn = () => {
  function handleSubmit(e) {
    e.preventDefault();
    const username = document.getElementById('uid');
    const password = document.getElementById('pwd');
    /*
    axios.get("http://localhost:8080/api/login",{
    //axios.get("https://serene-spire-91674.herokuapp.com/", {
    params: {
    book: book
  }})
  */
  }
  
  return (
        <div className="container-fluid">
        <section className= "row justify-content-center">
        <form 
        method="post" 
        className="form-container"
        onSubmit={handleSubmit}> 
        <h3>Sign in to Book Tabs</h3>
        <h6 className="card-subtitle mb-2 text-muted">Welcome back. Sign in with your account.</h6>
        <p> Username</p>
        <input type="text" id="uid" placeholder="Type your username"></input>
        <p> Password </p>
        <input type="password" id="pwd" placeholder="Type your password"></input>
        <br></br>
        <button type="submit" className="btn btn-secondary" name="submit">Log In</button>
        <br></br>
        <Link to="/SignUp">Not a member? Sign up today!</Link>
        </form>
      
      </section>
      </div>
    );
}
export default LogIn;