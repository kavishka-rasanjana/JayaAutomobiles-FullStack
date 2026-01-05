import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // State to handle form input values (Username & Password)
  const [formData, setFormData] = useState({ username: '', password: '' });
  
  // State to manage and display error messages
  const [error, setError] = useState('');
  
  // Hook to navigate programmatically to different pages
  const navigate = useNavigate();

  // Update state dynamically as the user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default page reload
    setError(''); // Clear any previous errors

    try {
      const apiUrl = 'https://localhost:7219/api/Auth/login';

      // 1. Send a POST request to the backend with user credentials
      const response = await axios.post(apiUrl, formData);

      // 2. If successful, receive the JWT Token from the backend
      const token = response.data;
      
      // 3. Store the Token securely in the browser's Local Storage
      // This allows us to keep the user logged in even after refreshing
      localStorage.setItem('token', token);

      // 4. Redirect the user to the Admin Dashboard
      alert("Login Successful!");
      navigate('/admin');

    } catch (err) {
      // Handle authentication failures (e.g., Wrong password)
      console.error("Login Error:", err);
      setError('Invalid Username or Password. Please try again.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      
      {/* Login Card with Dark Theme Styling */}
      <Card style={{ width: '400px', padding: '20px', backgroundColor: '#1e1e1e', color: 'white', border: '1px solid #333' }}>
        
        <h2 className="text-center mb-4" style={{ color: '#ff3b30' }}>Admin Login</h2>
        
        {/* Display Error Alert if login fails */}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          
          {/* Username Input */}
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="text" 
              name="username" 
              placeholder="Enter username" 
              onChange={handleChange} 
              required 
            />
          </Form.Group>

          {/* Password Input */}
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              name="password" 
              placeholder="Enter password" 
              onChange={handleChange} 
              required 
            />
          </Form.Group>

          <Button variant="danger" type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;