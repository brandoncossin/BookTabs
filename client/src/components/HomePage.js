import React, { useState } from 'react';
import {useHistory, Link} from "react-router-dom";
import globeSvg from '../icons/globeIcon.svg';
import bookSvg from '../icons/bookIcon.svg';
import noteSvg from '../icons/noteIcon.svg';

const HomePage = (props) => {
  let history = useHistory();
  const [book, setBook] = useState("");
  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem("book", book);
    localStorage.setItem("result", []);
    localStorage.setItem("InitialSearch", "initialized");    
    history.push("/BookList", {state: book})
  }
  //If nothing is input, returns the homepage
    return (
        <div className="HomeContainer"> 
        <div className="HomeRow">
            <div className="column-1">
        <h1>Keep Tabs on Your Books <br></br>-With BookTabs</h1>
        <h4>Search for a book today</h4>
        {!props.isLoggedIn && (
        <Link as={Link} to={{pathname: '/SignUp'}} >
        <button className="HomeButton" type=" button" >Sign Up Today</button>
        </Link>
        )}
            </div>
            <div className="col-2">   
            </div>
        </div>
        
        <div className="SearchBarRow">
        <form onSubmit={handleSubmit}>
        <input type="text"
              onChange={handleChange}
              className="SearchBar"
              placeholder="Search for Books"
              autoComplete="off">
                </input>
                </form>
      </div>
      <div className="row">
      <div className="homeLogos">
      <img src={bookSvg} alt="book logo"/>
      <p>Build Your Library</p>
      </div>
      <div className="homeLogos">
      <img src={globeSvg} alt="globe logo"/>
      <p>Explore &amp; Discover</p>
      </div>
      <div className="homeLogos">
      <img src={noteSvg} alt="note logo"/>
      <p>Share Your Thoughts</p>
      </div>
      </div>
      </div>
      
    );
  }

export default HomePage;