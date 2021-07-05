import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import '../App.css';
const LogIn = () => {
    return (
        <section className="container-fluid">
        <section className= "row justify-content-center">
        <form method="post" className="form-container"> 
        <h3>Sign in to Book Tabs</h3>
        <p> Username</p>
        <input type="text" name="uid" placeholder="Type your username"></input>
        <p> Password </p>
        <input type="password" name="pwd" placeholder="Type your password"></input>
        <br></br>
        <button type="submit" className="btn btn-secondary" name="submit">Log In</button>
        <br></br>
        <Link to="/SignUp">Not a member? Sign up today!</Link>
        </form>
      
      </section>
      </section>
    );
}
export default LogIn;