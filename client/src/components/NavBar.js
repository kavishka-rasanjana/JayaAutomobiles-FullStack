import React from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link

const NavBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* Link to Home Page */}
        <Navbar.Brand as={Link} to="/">🚗 Jaya Automobiles</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Navigate to Home */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            
            {/* Navigate to Admin Page */}
            <Nav.Link as={Link} to="/Login">Admin Panel</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search Cars..."
              className="me-2"
              aria-label="Search"
              value={searchTerm}
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