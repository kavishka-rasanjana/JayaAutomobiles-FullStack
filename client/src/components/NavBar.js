import React from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// We receive 'searchTerm' and 'setSearchTerm' as props from App.js
// This allows the Search Input to control the state in the parent component
const NavBar = ({ searchTerm, setSearchTerm }) => {
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        
        {/* Brand Logo - Clicking this redirects to Home */}
        <Navbar.Brand as={Link} to="/">
            🚗 Jaya Automobiles
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            {/* Navigation Link to Home Page */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            
            {/* Navigation Link to Admin Login Page */}
            <Nav.Link as={Link} to="/login">Admin Panel</Nav.Link>
            
          </Nav>
          
          {/* Search Bar Section */}
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search Cars..."
              className="me-2"
              aria-label="Search"
              // Bind the input value to the state received from props
              value={searchTerm}
              // Update the state in App.js whenever the user types
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-danger">Search</Button>
          </Form>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;