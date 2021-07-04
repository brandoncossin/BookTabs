import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import '../App.css';
const LogIn = () => {
    return (
        <section class="container-fluid">
        <section class= "row justify-content-center">
        <form method="post" class="form-container"> 
        <h3>Sign in to Book Tabs</h3>
        <p> Username</p>
        <input type="text" name="uid" placeholder="Type your username"></input>
        <p> Password </p>
        <input type="password" name="pwd" placeholder="Type your password"></input>
        <br></br>
        <button type="submit" class="btn btn-secondary" name="submit">Log In</button>
        <br></br>
        <Link to="/SignUp">Not a member? Sign up today!</Link>
        </form>
      
      </section>
      </section>
    );
}
export default LogIn;