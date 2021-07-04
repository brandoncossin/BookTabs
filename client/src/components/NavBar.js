import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavDropdown, NavItem} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const NavBar = () => {
    return (
      
        <Navbar class="navbar" expand="lg">
  <Navbar.Brand as={Link} to="/" className="ml-2">Book Tabs</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <NavItem className="ml-2">
          <Nav.Link as={Link} to="/SignUp" >Sign Up</Nav.Link>
      </NavItem>
      <NavItem className="ml-2">
          <Nav.Link as={Link} to="/LogIn" >Log In</Nav.Link>
      </NavItem>
      <NavItem className="ml-2">
          <Nav.Link as={Link} to="/Blog" >Blog</Nav.Link>
      </NavItem>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown" className="ml-2">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    
  </Navbar.Collapse>
</Navbar>
    );
}
export default NavBar;