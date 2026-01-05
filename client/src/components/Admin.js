import React, { useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import AddCar from './AddCar'; 
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  // Hook to navigate programmatically
  const navigate = useNavigate();

  // useEffect runs once when the component mounts to check authentication
  useEffect(() => {
    // 1. Retrieve the JWT token from local storage
    const token = localStorage.getItem('token');
    
    // 2. If no token is found, redirect the user to the Login page
    if (!token) {
      alert("Access Denied! Please login first.");
      navigate('/login');
    }
  }, [navigate]); // Dependency array ensures this runs when navigate changes (usually once)

  // Function to handle Logout
  const handleLogout = () => {
    // 1. Remove the token from storage (Security best practice)
    localStorage.removeItem('token');
    
    // 2. Redirect back to Login page
    navigate('/login');
  };

  return (
    <Container className="mt-5">
      
      {/* Header Section with Title and Logout Button */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="text-danger">Admin Dashboard</h2>
        </Col>
        <Col className="text-end">
          <Button variant="outline-dark" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>

      <hr />

      {/* Render the AddCar component */}
      <div className="mt-4">
        <AddCar />
      </div>

    </Container>
  );
};

export default Admin;