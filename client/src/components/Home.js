import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import '../App.css'; 

// Receive 'searchTerm' as a prop from the parent component (NavBar)
const Home = ({ searchTerm }) => {
  
  // State to store the list of cars fetched from the API
  const [cars, setCars] = useState([]);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Define the API endpoint (Ensure the port matches your backend)
    const apiUrl = 'https://localhost:7219/api/Cars';

    axios.get(apiUrl)
      .then(res => {
        setCars(res.data); // Update state with fetched data
      })
      .catch(err => {
        console.error("Error fetching cars:", err);
      });
  }, []); // Empty dependency array ensures this runs only once on load

  // Logic to filter cars based on the user's search input
  // It checks if the Brand or Model contains the search text (Case insensitive)
  const filteredCars = cars.filter(car => 
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5 mb-5">
      
      {/* Brand Title with Custom Styling */}
      <h2 className="text-center mb-5 animate-fade-in" style={{ fontWeight: '900', letterSpacing: '2px' }}>
        <span style={{ color: '#ff3b30' }}>JAYA</span> AUTOMOBILES
      </h2>

      <Row>
        {filteredCars.map((car, index) => (
          <Col key={car.id} lg={4} md={6} sm={12} className="mb-4">
            
            {/* Apply animation delay based on the index.
               This creates a staggered fade-in effect (cards appear one by one).
            */}
            <div className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              
              <Card className="car-card h-100 shadow-sm">
                
                {/* Car Image Section */}
                <div className="car-image-container">
                  <Card.Img 
                    variant="top" 
                    src={car.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"} 
                    className="car-image"
                    alt={`${car.brand} ${car.model}`}
                  />
                  {/* Display Year as a Badge */}
                  <Badge bg="danger" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    {car.year}
                  </Badge>
                </div>

                {/* Car Details Section */}
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="card-title fw-bold">
                    {car.brand} {car.model}
                  </Card.Title>
                  
                  <div className="mt-auto">
                    {/* Format price with commas (e.g., 8,500,000) */}
                    <h5 className="price-tag text-primary">
                      Rs. {car.price.toLocaleString()}
                    </h5>
                    
                    {/* Action Buttons */}
                    <div className="d-grid gap-2 mt-3">
                      <Button variant="outline-dark" size="sm" style={{ borderRadius: '20px' }}>
                        More Details
                      </Button>
                      <Button variant="danger" size="sm" style={{ borderRadius: '20px', fontWeight: 'bold' }}>
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>

            </div>
          </Col>
        ))}
      </Row>

      {/* Show a message if no cars match the search term */}
      {filteredCars.length === 0 && (
        <div className="text-center mt-5 text-muted">
          <h4>No cars found matching your search.</h4>
        </div>
      )}

    </Container>
  );
};

export default Home;