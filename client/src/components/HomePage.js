import React, { useState } from 'react';

const HomePage = () =>{
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
    //this.props.history.push('/BookList');
    window.location.href = "/BookList"
  }
  //If nothing is input, returns the homepage
    return (
        <div class="HomeContainer"> 
        <div class="HomeRow">
            <div class="column-1">
        <h1>Keep Tabs on Your Books <br></br>-With Book Tabs</h1>
        <h4>Search for a book today</h4>
        <button class="HomeButton" type=" button" >Sign Up Today</button>
            </div>
            <div class="col-2">   
            </div>
        </div>
        <div class="SearchBarRow">
        <form onSubmit={handleSubmit}>
        <input type="text"
              onChange={handleChange}
              className="SearchBar"
              placeholder="Search for Books"
              autoComplete="off">
                </input>
                </form>
      </div>
      </div>
    );
  }

export default HomePage;