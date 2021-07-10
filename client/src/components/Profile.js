import React, {useEffect} from 'react';
import axios from 'axios';

export default class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
                uid : ""
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
          const user = data.data.token.uid;
          this.setState({uid : user})
        });
        }
      }
    render(){
    return(
        <div className="container">
        <p>Profile Page of {this.state.uid}</p>
        </div>
    );
    }
}
