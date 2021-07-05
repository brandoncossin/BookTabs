import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import '../App.css';

const SignUp = () => {
    return (
        <section className="container-fluid">
        <section className= "row justify-content-center">
        <form method="post" className="form-container"> 
        <h3>Sign up with Book Tabs</h3>
        <h6 className="card-subtitle mb-2 text-muted">Create your account. It's free and only takes a minute.</h6>
        <p>Name</p>
        <input type="text" name="name" placeholder="Type your name"></input>
        <p>Email</p>
        <input type="text" name="email" placeholder="Type your email"></input>
        <p>Username</p>
        <input type="text" name="username" placeholder="Type your username"></input>
        <p>Password</p>
        <input type="password" name="pwd" placeholder="Type your password"></input>
        <p>Re-enter Password</p>
        <input type="password" name="pwdRepeat" placeholder="Re-enter username"></input>
        <br></br>
        <button type="submit" className="btn btn-secondary" name="submit">Sign Up</button>
        <br></br>
        <Link to="/Login">Already a member? Sign in!</Link>
    </form>
    </section>
    </section>
    );
}
export default SignUp;