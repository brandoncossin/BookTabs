import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import '../App.css';
import axios from 'axios';

export default class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name : "",
            email : "",
            uid : "",
            pwd : "",
            pwdCheck : ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({[event.target.name] : event.target.value});
      }
    handleSubmit(e) {
        e.preventDefault();
        if(this.state.pwd !== this.state.pwdCheck){
            document.getElementById("message").innerHTML = "**Passwords must match!";  
        }
        axios.post("http://localhost:8080/api/signup", this.state, 
        {headers: {"Content-Type": "application/json"}}
            //axios.get("https://serene-spire-91674.herokuapp.com/api/signup", { 
            ).then(function (response) {
            console.log(response);
        });
    }


    render() {
        return (
            <section className="container-fluid">
                <section className="row justify-content-center">
                    <form
                        method="post"
                        className="form-container"
                        onSubmit={this.handleSubmit}>
                        <h3>Sign up with Book Tabs</h3>
                        <h6 className="card-subtitle mb-2 text-muted">Create your account. It's free and only takes a minute.</h6>
                        <p>Name</p>
                        <input type="text" name="name" value={this.state.name} autoComplete="off"
                        onChange={this.handleChange} placeholder="Type your name"></input>
                        <p>Email</p>
                        <input type="text" name="email" value={this.state.email} autoComplete="off"
                        onChange={this.handleChange} placeholder="Type your name"></input>
                        <p>Username</p>
                        <input type="text" name="uid" value={this.state.uid} autoComplete="off"
                        onChange={this.handleChange} placeholder="Type your name"></input>
                        <p>Password</p>
                        <input type="password" name="pwd" value={this.state.pwd} autoComplete="off"
                        onChange={this.handleChange} placeholder="Type your name"></input>
                        <p>Re-Enter Password</p>
                        <input type="password" name="pwdCheck" value={this.state.pwdCheck} autoComplete="off"
                        onChange={this.handleChange} placeholder="Type your name"></input>
                        <span id = "message" style ={{color: "red" , background: "transparent"}}></span>
                        <br></br>
                        <button type="submit" className="btn btn-secondary" name="submit">Sign Up</button>
                        <br></br>
                        <Link to="/Login">Already a member? Sign in!</Link>
                    </form>
                </section>
            </section>
        );
    }
}