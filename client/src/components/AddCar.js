import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const AddCar = () => {
  // 1. Data තියාගන්න State හදාගැනීම
  const [carData, setCarData] = useState({
    brand: '',
    model: '',
    year: '',
    price: '',
    imageUrl: ''
  });

  const [message, setMessage] = useState(null); // Success/Error මැසේජ් පෙන්වන්න

  // 2. Input වල Type කරන දේවල් State එකට දාගැනීම
  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  // 3. Submit බට්න් එක එබුවම API එකට Data යැවීම
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // වැදගත්: ඔයාගේ Visual Studio Port නම්බර් එක මෙතනට දාන්න (උදා: 7219)
      await axios.post('https://localhost:7219/api/Cars', {
        ...carData,
        year: parseInt(carData.year),   // ඉලක්කම් බවට හරවනවා
        price: parseFloat(carData.price) // දශම ඉලක්කම් බවට හරවනවා
      });

      setMessage({ type: 'success', text: 'Car added successfully!' });
      // Form එක හිස් කිරීම
      setCarData({ brand: '', model: '', year: '', price: '', imageUrl: '' });

    } catch (error) {
      console.error("Error adding car:", error);
      setMessage({ type: 'danger', text: 'Error adding car. Please try again.' });
    }
  };

  return (
    <Container className="mt-4 p-4 border rounded shadow-sm bg-light" style={{ maxWidth: '600px' }}>
      <h3 className="text-center mb-4">Add New Vehicle</h3>
      
      {message && <Alert variant={message.type}>{message.text}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Brand (වර්ගය)</Form.Label>
          <Form.Control 
            type="text" 
            name="brand" 
            placeholder="Ex: Toyota" 
            value={carData.brand} 
            onChange={handleChange} 
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Model (මාදිලිය)</Form.Label>
          <Form.Control 
            type="text" 
            name="model" 
            placeholder="Ex: Allion" 
            value={carData.model} 
            onChange={handleChange} 
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Year (වර්ෂය)</Form.Label>
          <Form.Control 
            type="number" 
            name="year" 
            placeholder="Ex: 2018" 
            value={carData.year} 
            onChange={handleChange} 
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price (මිල - Rs)</Form.Label>
          <Form.Control 
            type="number" 
            name="price" 
            placeholder="Ex: 8500000" 
            value={carData.price} 
            onChange={handleChange} 
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL (Image Link)</Form.Label>
          <Form.Control 
            type="text" 
            name="imageUrl" 
            placeholder="Paste image link here..." 
            value={carData.imageUrl} 
            onChange={handleChange} 
          />
          <Form.Text className="text-muted">
            දැනට Google එකෙන් ෆොටෝ එකක් අරන් Copy Image Address කරලා මෙතනට දාන්න.
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