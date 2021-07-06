import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import '../App.css';
import axios from 'axios';

export default class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "hommmm",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({username: event.target.value});
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


    render() {
        return (
            <section className="container-fluid">
                <section className="row justify-content-center">
                    <form
                        method="post"
                        className="form-container"
                        onSubmit={this.handleSubmit.bind(this)}>
                        <h3>Sign up with Book Tabs</h3>
                        <h6 className="card-subtitle mb-2 text-muted">Create your account. It's free and only takes a minute.</h6>
                        <p>Name</p>
                        <input type="text" id="username" value={this.state.username} onChange={this.handleChange.bind(this)} placeholder="Type your name"></input>
                        
                        <button type="submit" className="btn btn-secondary" name="submit">Sign Up</button>
                        <br></br>
                        <Link to="/Login">Already a member? Sign in!</Link>
                    </form>
                </section>
            </section>
        );
    }
}