import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom'

export default class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
                uid : "",
                name: "",
                myList: [],
        }  
    }
    componentDidMount() {
        if(sessionStorage.getItem('token')){
          const token = sessionStorage.getItem('token')
          axios.get("http://localhost:8080/profile",{
        params: {
        token: token
      }})
        .then(data => {
          this.setState({uid : data.data.profile.uid})
          this.setState({name : data.data.profile.name})
          this.setState({myList : data.data.profile.myList})
        });
        }
      }
    render(){
    return(
        <div className="container">
        <h1>Welcome {this.state.uid}</h1>
        <h3>{this.state.name}</h3>
        </div>
    );
    }
}
