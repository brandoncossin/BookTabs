import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link} from "react-router-dom";

const RecentActivity = (props) => {
const [activity, setActivity] = useState([]);
const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if(isLoading){
        axios.get("http://localhost:8080/recentActivity", {
          //axios.get("https://serene-spire-91674.herokuapp.com/recentActivity", {
            params: {
            }
        })
            .then(data => {
                setActivity(data.data.data);
                setIsLoading(false)
                console.log(activity)
            });
    }
    })
    if(isLoading){
        return <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
      else{
    return (
        <div className="container-fluid">
            <h1>Activity</h1>
            <br></br>
            {activity.map((action, i) => (
            <div className="RecentActivity row" key={i}>
                <h5>
                    <b>{action.uid}</b>
                    {action.bookActivity}
                    <b><Link className="BookResultLink" as={Link} to={{pathname: `/BookResult/${action.bookId}`, 
                  state: {
                  isLoggedIn: props.isLoggedIn
                  }}} >{action.bookTitle}</Link></b>
                    {action.activityLocation}</h5>
            </div>
            ))}
        </div>
    );
                }
                
}
export default RecentActivity;