import axios from 'axios';

class userAuthorization{
    getToken(token){
        console.log(token);
        axios.get("http://localhost:8080/authCheck",{
      params: {
      token: token
    }})
    .then((res) => {
      if(res.data.status !== 'error'){
        console.log(res.data.data); 
        //SetLoggedIn(true);
        return token;      
      }
      else{
          window.location.href = "/";
          alert(res.data.error);
          sessionStorage.removeItem('token');
          window.location.reload();
      }
  });
    }
}
export default new userAuthorization;