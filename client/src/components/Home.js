import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import '../App.css'; // අපි හදපු CSS එක import කිරීම

const Home = ({ searchTerm }) => {
  const [cars, setCars] = useState([]);

  // API එකෙන් Data ගැනීම
  useEffect(() => {
    // වැදගත්: ඔයාගේ Port Number එක (7219) හරියටම දාන්න
    axios.get('https://localhost:7219/api/Cars')
      .then(res => setCars(res.data))
      .catch(err => console.error("Error fetching cars:", err));
  }, []);

  // Search කිරීමේ Logic එක
  const filteredCars = cars.filter(car => 
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5 mb-5">
      <h2 className="text-center mb-5 animate-fade-in" style={{ fontWeight: '900', letterSpacing: '2px' }}>
        <span style={{ color: '#ff3b30' }}>JAYA</span> AUTOMOBILES
      </h2>

      <Row>
        {filteredCars.map((car, index) => (
          <Col key={car.id} lg={4} md={6} sm={12} className="mb-4">
            
            {/* Animation Delay එක දාලා කාඩ් එකින් එක උඩට එන විදිහට හැදීම */}
            <div className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              
              <Card className="car-card h-100">
                <div className="car-image-container">
                  <Card.Img 
                    variant="top" 
                    src={car.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"} 
                    className="car-image"
                  />
                  <Badge bg="danger" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    {car.year}
                  </Badge>
                </div>

                <Card.Body className="d-flex flex-column">
                  <Card.Title className="card-title">{car.brand} {car.model}</Card.Title>
                  
                  <div className="mt-auto">
                    <h5 className="price-tag">Rs. {car.price.toLocaleString()}</h5>
                    <div className="d-grid gap-2 mt-3">
                      <Button variant="outline-light" size="sm" style={{ borderRadius: '20px' }}>
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

      {filteredCars.length === 0 && (
        <div className="text-center mt-5 text-muted">
          <h4>No cars found matching your search.</h4>
        </div>
      )}
    </Container>
  );
};

export default Home;