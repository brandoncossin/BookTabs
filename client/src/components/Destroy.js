import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
function Destroy (){
  //This prevents the site from routing before the user
  //is marked as authenticated or not
  const [isLoading, setIsLoading] = useState(true);
  const [userMyList, setUserMyList] = useState([]);

  //Use Effect to launch on page load
  useEffect(() => {
    if (sessionStorage.getItem('token') && isLoading) {
      const token = sessionStorage.getItem('token')
      axios.get("http://localhost:8080/authCheck", {
        params: {
          token: token
        }
      })
      //If data is authenticated user is logged in
        .then((res) => {
          if (res.data.status !== 'error') {
            setIsLoading(false);

            setUserMyList(res.data.userMyList)
          }
          else {
            window.location.href = "/";
            alert(res.data.error);
            sessionStorage.removeItem('token');
            window.location.reload();
            setIsLoading(false);
          }
        });
    }
  else{
    setIsLoading(false);
  }
}, [isLoading, userMyList])
  //If loading is incomplete renders a spinner
  if(isLoading){
    return <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  }
  else{
  return (
      <div>Hi</div>
  )}
}
export default Destroy;
