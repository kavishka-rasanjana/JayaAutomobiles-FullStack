import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const AddCar = () => {

  // State to hold form input values
  const [carData, setCarData] = useState({
    brand: '',
    model: '',
    year: '',
    price: '',
    imageUrl: ''
  });

  // State to handle success or error messages (User Feedback)
  const [message, setMessage] = useState(null);

  // Update state when user types in input fields
  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  // Handle form submission and send data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // IMPORTANT: Ensure this matches your running backend port
      const apiUrl = 'https://localhost:7219/api/Cars';

      // Send POST request to backend
      await axios.post(apiUrl, {
        ...carData,
        year: parseInt(carData.year),   // Convert string input to integer
        price: parseFloat(carData.price) // Convert string input to float
      });

      // Show success message to the user
      setMessage({ type: 'success', text: 'Car added successfully!' });

      // Reset the form fields after successful submission
      setCarData({ brand: '', model: '', year: '', price: '', imageUrl: '' });

    } catch (error) {
      console.error("Error adding car:", error);
      setMessage({ type: 'danger', text: 'Error adding car. Please try again.' });
    }
  };

  return (
    <Container className="mt-4 p-4 border rounded shadow-sm bg-light" style={{ maxWidth: '600px' }}>
      <h3 className="text-center mb-4">Add New Vehicle</h3>
      
      {/* Display Success/Error Alert if message exists */}
      {message && <Alert variant={message.type}>{message.text}</Alert>}

      <Form onSubmit={handleSubmit}>
        
        {/* Brand Input */}
        <Form.Group className="mb-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control 
            type="text" 
            name="brand" 
            placeholder="Ex: Toyota" 
            value={carData.brand} 
            onChange={handleChange} 
            required 
          />
        </Form.Group>

        {/* Model Input */}
        <Form.Group className="mb-3">
          <Form.Label>Model</Form.Label>
          <Form.Control 
            type="text" 
            name="model" 
            placeholder="Ex: Allion" 
            value={carData.model} 
            onChange={handleChange} 
            required 
          />
        </Form.Group>

        {/* Year Input */}
        <Form.Group className="mb-3">
          <Form.Label>Year</Form.Label>
          <Form.Control 
            type="number" 
            name="year" 
            placeholder="Ex: 2018" 
            value={carData.year} 
            onChange={handleChange} 
            required 
          />
        </Form.Group>

        {/* Price Input */}
        <Form.Group className="mb-3">
          <Form.Label>Price (Rs)</Form.Label>
          <Form.Control 
            type="number" 
            name="price" 
            placeholder="Ex: 8500000" 
            value={carData.price} 
            onChange={handleChange} 
            required 
          />
        </Form.Group>

        {/* Image URL Input */}
        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control 
            type="text" 
            name="imageUrl" 
            placeholder="Paste image link here..." 
            value={carData.imageUrl} 
            onChange={handleChange} 
          />
          <Form.Text className="text-muted">
            Tip: Copy an image address from Google and paste it here.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Add Vehicle
        </Button>
      </Form>
    </Container>
  );
};

export default AddCar;