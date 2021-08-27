import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect } from "react-router-dom";
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
    //Long validation function, validates whole form.
    handleValidation(){
        let formIsValid = true;
        document.getElementById("errormessage").innerHTML = "";
        if(!this.state.name){
            document.getElementById("errormessage").innerHTML = "**Please enter a name";
            return formIsValid = false;
        }
        if(!this.state.email){
            document.getElementById("errormessage").innerHTML = "**Please enter an email";
            return formIsValid = false;
        }
        if(!this.state.uid){
            document.getElementById("errormessage").innerHTML = "**Please enter a username";
            return formIsValid = false;
        }
        if(!this.state.pwd){
            document.getElementById("errormessage").innerHTML = "**Please enter a password";
            return formIsValid = false;
        }
        if(!this.state.pwdCheck){
            document.getElementById("errormessage").innerHTML = "**Please enter the password again";
            return formIsValid = false;
        }
        if(this.state.pwd !== this.state.pwdCheck){
            document.getElementById("errormessage").innerHTML = "**Passwords do not match";
            return formIsValid = false;
        }
        return formIsValid;
    }
    handleChange(event) {
        this.setState({[event.target.name] : event.target.value});
      }
    async handleSubmit(e) {
        e.preventDefault();
        //If Handle Validation is false, request is not sent
        if(this.handleValidation()){
        await axios.post("http://localhost:8080/api/signup", this.state, 
        {headers: {"Content-Type": "application/json"}}
            //axios.get("https://serene-spire-91674.herokuapp.com/api/signup", { 
            ).then((res) => {
            if(res.data.status === 'success'){
                <Redirect to={{
                    pathname: "/Blog"}} />
                  window.location.reload();          
            }
            else{
                document.getElementById("errormessage").innerHTML = res.data.error;
                //alert(res.data.error);
            }
        });
    }
    }


    render() {
        return (
            <section className="container-fluid ">
                <section className="row justify-content-center">
                    <form
                        method="post"
                        className="form-container"
                        onSubmit={this.handleSubmit}>
                        <h3>Sign up with Book Tabs</h3>
                        <h6 className="card-subtitle mb-2 text-muted">Create your account. It's free and only takes a minute.</h6>
                        <span id = "errormessage" style ={{color: "red" , background: "transparent"}}></span>
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
                        <br></br>
                        <button type="submit" className="HomeButton" name="submit">Sign Up</button>
                        <br></br>
                        <Link to="/Login">Already a member? Sign in!</Link>
                    </form>
                </section>
            </section>
        );
    }
}