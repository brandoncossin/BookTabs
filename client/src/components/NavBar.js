import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, NavItem } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import bookTabsLogo from '../icons/BookTabsLogo.png';
import profileIcon from '../icons/profileIcon.svg';
function NavBar(props) {
  let history = useHistory();
  function logOut() {
    sessionStorage.clear();
    console.log("logged out");
    history.push("/");
    window.location.reload();
  }

  return (
    <Navbar className="navbar" expand="lg">
      <Navbar.Brand as={Link} to="/" className="ml-2 mt-auto mb-auto" >
        <img src={bookTabsLogo} className="BookTabLogo" height="25" alt=""></img>
        </Navbar.Brand>
    <div className="d-flex order-lg-1 ml-auto pr-2">
    {props.isLoggedIn && (
    <NavDropdown className="ml-auto "title={<img className="ml-auto profileIcon" width="40" height="40" src={profileIcon} alt=""></img>} id="navbarScrollingDropdown">
        <NavDropdown.Item as={Link} to="/Settings">Settings</NavDropdown.Item>
        <NavDropdown.Divider />
        <Nav.Link onClick={logOut} >
                   <button className="NavButton" type=" button" >Log Out</button>
                </Nav.Link>
      </NavDropdown>
    )}
    </div>
    
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    
      <Navbar.Collapse className="mr-auto " id="basic-navbar-nav">
        <Nav className="mr-auto ">
          <NavItem className="ml-2 ">
            <Nav.Link as={Link} to="/Discover" >Discover</Nav.Link>
          </NavItem>
          <NavItem className="ml-2">
            <Nav.Link as={Link} to="/Blog" >Blog</Nav.Link>
          </NavItem>
          
          <NavItem className="ml-2">
            {props.isLoggedIn && (
              <Nav.Link as={Link} to="/Profile" >My Lists</Nav.Link>
            )}
          </NavItem>
          </Nav>
          <Nav className="ms-auto">
            <NavItem className="ml-2 mt-auto mb-auto" >
            {!props.isLoggedIn && (
              <Nav.Link as={Link} to="/SignUp" >Sign Up</Nav.Link>
            )}
            </NavItem>
            <NavItem className="" >
              {!props.isLoggedIn && (
                <Nav.Link as={Link} to="/LogIn" >
                  <button className="NavButton" type=" button" >Log In</button>
                </Nav.Link>
              )}
            </NavItem>
          
          </Nav>

      </Navbar.Collapse>
    </Navbar>
  );
}
export default NavBar;