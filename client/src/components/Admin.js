import React, { useEffect } from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import AddCar from './AddCar'; 
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  // Authentication Check
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Access Denied! Please login first.");
      navigate('/login');
    }
  }, [navigate]);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Container className="mt-5 pb-5 animate-fade-in">
      
      {/* --- 1. Header Section --- */}
      <div className="d-flex justify-content-between align-items-center mb-5 border-bottom border-secondary pb-3">
        <div>
          <h2 className="text-white fw-bold" style={{ letterSpacing: '2px' }}>
            <span style={{ color: '#ff3b30' }}>ADMIN</span> DASHBOARD
          </h2>
          <p className="text-muted mb-0">Manage your car inventory and track performance.</p>
        </div>
        <Button variant="outline-danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* --- 2. Statistics Cards (UI Only - Not Real Data) --- */}
      <Row className="mb-5">
        <Col md={4} className="mb-3">
          <Card className="dashboard-card text-center p-4">
            <h6 className="text-muted text-uppercase">Total Cars in Stock</h6>
            <h1 className="fw-bold text-white display-4">12</h1>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="dashboard-card text-center p-4">
            <h6 className="text-muted text-uppercase">Cars Sold (This Month)</h6>
            <h1 className="fw-bold text-success display-4">5</h1>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="dashboard-card text-center p-4">
            <h6 className="text-muted text-uppercase">Total Inventory Value</h6>
            <h1 className="fw-bold display-4" style={{ color: '#ff3b30' }}>$4.2M</h1>
          </Card>
        </Col>
      </Row>

      {/* --- 3. Add Car Form Container --- */}
      <Row className="justify-content-center">
        <Col lg={10}>
          <div className="dashboard-card p-4 p-md-5">
            <div className="text-center mb-4">
              <h4 className="text-white fw-bold">ADD NEW VEHICLE</h4>
              <p className="text-muted small">Enter vehicle details below to update the system.</p>
            </div>
            
            {/* Load the AddCar Form */}
            <AddCar />
          </div>
        </Col>
      </Row>

    </Container>
  );
};

export default Admin;