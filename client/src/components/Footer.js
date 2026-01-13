import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css'; // Import custom styles

const Footer = () => {
  return (
    <footer className="modern-footer mt-auto">
      <Container>
        <Row>
          
          {/* --- Column 1: Brand Information --- */}
          <Col md={4} className="mb-4">
            <h5 className="footer-title">
              <span style={{ color: '#ff3b30' }}>JAYA</span> AUTOMOBILES
            </h5>
            <p>
              Premium vehicle inventory management system. 
              We provide the best quality cars for your dream journey. 
              Reliable, Fast, and Secure.
            </p>
          </Col>

          {/* --- Column 2: Quick Links --- */}
          <Col md={4} className="mb-4">
            <h5 className="footer-title">Quick Links</h5>
            <Link to="/" className="footer-link">🏠 Home</Link>
            <Link to="/login" className="footer-link">🔑 Admin Login</Link>
            <Link to="#" className="footer-link">🚙 New Arrivals</Link>
            <Link to="#" className="footer-link">📞 Contact Support</Link>
          </Col>

          {/* --- Column 3: Contact Information --- */}
          <Col md={4} className="mb-4">
            <h5 className="footer-title">Contact Us</h5>
            <p>📍 No. 123, High Level Road, Colombo 05</p>
            <p>📞 +94 77 123 4567</p>
            <p>✉️ support@jayaautomobiles.com</p>
            
            <div className="mt-3">
              {/* Social Media Placeholders */}
              <span className="social-icon">Facebook</span>
              <span className="social-icon">LinkedIn</span>
            </div>
          </Col>
        </Row>

        <hr style={{ borderColor: '#333' }} />

        {/* --- Copyright Section --- */}
        <Row className="pt-2">
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} <span style={{ color: '#ff3b30' }}>Jaya Automobiles</span>. All Rights Reserved.
            </p>
            <small className="text-muted">Designed by Kavishka Rasanjana</small>
          </Col>
        </Row>

      </Container>
    </footer>
  );
};

export default Footer;