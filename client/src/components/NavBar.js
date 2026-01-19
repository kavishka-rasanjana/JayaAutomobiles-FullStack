import React from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import '../App.css'; // Importing our custom CSS

const NavBar = ({ searchTerm, setSearchTerm }) => {
  
  // Hook to get the current route (to highlight active link)
  const location = useLocation();

  return (
    // 'sticky="top"' keeps the navbar fixed at the top when scrolling
    <Navbar expand="lg" variant="dark" sticky="top" className="modern-navbar py-3">
      <Container>
        
        {/* --- BRAND LOGO SECTION --- */}
        <Navbar.Brand as={Link} to="/" className="brand-text">
          {/* Logo Icon and Text */}
          <span style={{ fontSize: '1.8rem', marginRight: '10px' }}>🚗</span>
          <span style={{ color: '#ff3b30' }}>JAYA</span> {/* Red Color for First Word */}
          <span style={{ color: 'white' }}> AUTOMOBILES</span>
        </Navbar.Brand>

        {/* Mobile Toggle Button (Hamburger Menu) */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          
          {/* --- NAVIGATION LINKS --- */}
          <Nav className="mx-auto"> {/* 'mx-auto' centers the links */}
            
            {/* 1. HOME LINK */}
            <Nav.Link 
              as={Link} 
              to="/" 
              className={`nav-link-custom ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Nav.Link>

            {/* 2. ABOUT US LINK (Newly Added) */}
            <Nav.Link 
              as={Link} 
              to="/about" 
              className={`nav-link-custom ${location.pathname === '/about' ? 'active' : ''}`}
            >
              About Us
            </Nav.Link>

            {/* 3. ADMIN PANEL LINK */}
            <Nav.Link 
              as={Link} 
              to="/login" 
              className={`nav-link-custom ${location.pathname === '/login' ? 'active' : ''}`}
            >
              Admin Panel
            </Nav.Link>

          </Nav>

          {/* --- SEARCH BAR SECTION --- */}
          <Form className="d-flex mt-3 mt-lg-0">
            <FormControl
              type="search"
              placeholder="Search by Brand or Model..."
              className="me-2 search-input-modern" // Custom Rounded Input
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-danger" className="btn-search-modern">
              Search
            </Button>
          </Form>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;