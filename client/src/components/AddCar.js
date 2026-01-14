import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';

const AddCar = () => {

  const [carData, setCarData] = useState({
    brand: '',
    model: '',
    year: '',
    price: '',
    imageUrls: '' // Changed to string input for multiple URLs
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Split the comma-separated string into an array
    // 2. Trim whitespace from links
    // 3. Limit to max 5 images
    const imagesArray = carData.imageUrls
      .split(',')
      .map(url => url.trim())
      .filter(url => url !== "")
      .slice(0, 5); // Take only first 5 images

    try {
      const apiUrl = 'https://localhost:7219/api/Cars';

      await axios.post(apiUrl, {
        brand: carData.brand,
        model: carData.model,
        year: parseInt(carData.year),
        price: parseFloat(carData.price),
        imageUrls: imagesArray // Send array to backend
      });

      setMessage({ type: 'success', text: '✅ Vehicle added with images!' });
      setCarData({ brand: '', model: '', year: '', price: '', imageUrls: '' });
      setTimeout(() => setMessage(null), 4000);

    } catch (error) {
      console.error("Error adding car:", error);
      setMessage({ type: 'danger', text: '❌ Failed to add vehicle.' });
    }
  };

  return (
    <>
      {message && <Alert variant={message.type}>{message.text}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Brand Name</Form.Label>
              <Form.Control className="custom-input" type="text" name="brand" value={carData.brand} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Model Name</Form.Label>
              <Form.Control className="custom-input" type="text" name="model" value={carData.model} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Year</Form.Label>
              <Form.Control className="custom-input" type="number" name="year" value={carData.year} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Price (LKR)</Form.Label>
              <Form.Control className="custom-input" type="number" name="price" value={carData.price} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        {/* Multiple Image Input */}
        <Form.Group className="mb-4">
          <Form.Label className="text-white">Image URLs (Max 5)</Form.Label>
          <Form.Control 
            className="custom-input"
            as="textarea" 
            rows={3}
            name="imageUrls" 
            placeholder="Paste image links separated by commas (e.g. link1.jpg, link2.jpg)" 
            value={carData.imageUrls} 
            onChange={handleChange} 
          />
          <Form.Text className="text-muted">
            Separate multiple links with a comma (,). Only first 5 will be saved.
          </Form.Text>
        </Form.Group>

        <Button type="submit" className="w-100 btn-automobile py-3">ADD VEHICLE</Button>
      </Form>
    </>
  );
};

export default AddCar;