import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';

const AddCar = () => {

  // State for form data
  const [carData, setCarData] = useState({
    brand: '',
    model: '',
    year: '',
    price: '',
    imageUrl: ''
  });

  // State for user feedback messages
  const [message, setMessage] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API Endpoint (Ensure port 7219 is correct)
      const apiUrl = 'https://localhost:7219/api/Cars';

      // Send POST request
      await axios.post(apiUrl, {
        ...carData,
        year: parseInt(carData.year),    // Convert to Integer
        price: parseFloat(carData.price) // Convert to Decimal
      });

      // Show Success Message
      setMessage({ type: 'success', text: '✅ Vehicle added successfully to the inventory!' });
      
      // Clear Form
      setCarData({ brand: '', model: '', year: '', price: '', imageUrl: '' });

      // Auto-hide message after 4 seconds
      setTimeout(() => setMessage(null), 4000);

    } catch (error) {
      console.error("Error adding car:", error);
      setMessage({ type: 'danger', text: '❌ Failed to add vehicle. Please check connection.' });
    }
  };

  return (
    <>
      {/* Alert Message Section */}
      {message && <Alert variant={message.type} className="mb-4 text-center fw-bold">{message.text}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          {/* Brand Input */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted small text-uppercase fw-bold">Brand Name</Form.Label>
              <Form.Control 
                className="custom-input"
                type="text" 
                name="brand" 
                placeholder="Ex: Toyota" 
                value={carData.brand} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
          </Col>

          {/* Model Input */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted small text-uppercase fw-bold">Model Name</Form.Label>
              <Form.Control 
                className="custom-input"
                type="text" 
                name="model" 
                placeholder="Ex: Land Cruiser" 
                value={carData.model} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          {/* Year Input */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted small text-uppercase fw-bold">Manufactured Year</Form.Label>
              <Form.Control 
                className="custom-input"
                type="number" 
                name="year" 
                placeholder="Ex: 2024" 
                value={carData.year} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
          </Col>

          {/* Price Input */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted small text-uppercase fw-bold">Price (LKR)</Form.Label>
              <Form.Control 
                className="custom-input"
                type="number" 
                name="price" 
                placeholder="Ex: 45000000" 
                value={carData.price} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Image URL Input */}
        <Form.Group className="mb-4">
          <Form.Label className="text-muted small text-uppercase fw-bold">Image URL Link</Form.Label>
          <Form.Control 
            className="custom-input"
            type="text" 
            name="imageUrl" 
            placeholder="Paste the image address here..." 
            value={carData.imageUrl} 
            onChange={handleChange} 
          />
          <Form.Text className="text-muted small">
            Tip: Right-click an image on Google and select "Copy Image Address"
          </Form.Text>
        </Form.Group>

        {/* Submit Button */}
        <Button type="submit" className="w-100 btn-automobile py-3 shadow-lg">
          ADD VEHICLE TO SYSTEM
        </Button>
      </Form>
    </>
  );
};

export default AddCar;