import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // පිටු අතර මාරු වෙන්න උදව් වෙන Hook එක

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Backend එකට Data යවනවා (Port එක 7219 ද කියලා බලන්න)
      const response = await axios.post('https://localhost:7219/api/Auth/login', formData);

      // 2. හරියට Login වුනොත් Token එක ලැබෙනවා
      const token = response.data;
      
      // 3. Token එක Browser එකේ ආරක්ෂිතව Save කරගන්නවා
      localStorage.setItem('token', token);

      // 4. Admin පිටුවට හරවා යවනවා
      alert("Login Successful!");
      navigate('/admin');

    } catch (err) {
      // වැරදි නම් Error එක පෙන්නනවා
      setError('Invalid Username or Password');
      console.error(err);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card style={{ width: '400px', padding: '20px', backgroundColor: '#1e1e1e', color: 'white', border: '1px solid #333' }}>
        <h2 className="text-center mb-4" style={{ color: '#ff3b30' }}>Admin Login</h2>
        
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
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