import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../App.css'; // Import styles

const About = () => {
  return (
    <Container className="mt-5 pb-5">
      
      {/* --- Section 1: Hero / Intro --- */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-white display-4">
          ABOUT <span style={{ color: '#ff3b30' }}>JAYA AUTOMOBILES</span>
        </h1>
        <p className="text-muted fs-5">
          Sri Lanka's Premium Choice for High-Quality Vehicles.
        </p>
      </div>

      <Row className="align-items-center mb-5">
        <Col md={6}>
          {/* Use a placeholder or a real image link here */}
          <img 
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1000&auto=format&fit=crop" 
            alt="About Us" 
            className="img-fluid rounded shadow-lg"
            style={{ border: '1px solid #333' }}
          />
        </Col>
        <Col md={6} className="text-white mt-4 mt-md-0">
          <h2 className="fw-bold mb-3">Driven by Excellence</h2>
          <p style={{ color: '#ccc' }}>
            At <strong>Jaya Automobiles</strong>, we believe that buying a car is more than just a transaction; 
            it's the beginning of a journey. Established in 2024, we have served thousands of happy customers 
            across the island.
          </p>
          <p style={{ color: '#ccc' }}>
            Our mission is to provide the finest selection of premium vehicles with a focus on 
            <strong> quality, transparency, and customer satisfaction</strong>. Whether you are looking for a 
            luxury sedan or a family SUV, we have the perfect ride for you.
          </p>
        </Col>
      </Row>

      {/* --- Section 2: Why Choose Us (Feature Cards) --- */}
      <h3 className="text-white text-center mb-4 fw-bold">WHY CHOOSE US?</h3>
      
      <Row>
        {/* Feature 1 */}
        <Col md={4} className="mb-3">
          <Card className="bg-dark text-white text-center p-4 h-100 shadow" style={{ border: '1px solid #333' }}>
            <div style={{ fontSize: '3rem' }}>💎</div>
            <Card.Body>
              <Card.Title className="fw-bold mt-2">Premium Quality</Card.Title>
              <Card.Text className="text-muted">
                Every vehicle undergoes a strict 150-point inspection to ensure maximum reliability.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Feature 2 */}
        <Col md={4} className="mb-3">
          <Card className="bg-dark text-white text-center p-4 h-100 shadow" style={{ border: '1px solid #333' }}>
            <div style={{ fontSize: '3rem' }}>💰</div>
            <Card.Body>
              <Card.Title className="fw-bold mt-2">Best Price Guarantee</Card.Title>
              <Card.Text className="text-muted">
                We offer competitive market rates and flexible leasing options for your convenience.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Feature 3 */}
        <Col md={4} className="mb-3">
          <Card className="bg-dark text-white text-center p-4 h-100 shadow" style={{ border: '1px solid #333' }}>
            <div style={{ fontSize: '3rem' }}>🔧</div>
            <Card.Body>
              <Card.Title className="fw-bold mt-2">24/7 Support</Card.Title>
              <Card.Text className="text-muted">
                Our after-sales support team is always ready to assist you with any inquiries.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* --- Section 3: Developer Credit (Optional but Good for Portfolio) --- */}
      <div className="text-center mt-5 pt-4 border-top border-secondary">
        <p className="text-muted">
          Developed by <strong className="text-white">Kavishka Rasanjana</strong> as a Final Year Project.
        </p>
      </div>

    </Container>
  );
};

export default About;