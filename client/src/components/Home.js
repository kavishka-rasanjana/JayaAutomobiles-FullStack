import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Badge, Modal, Carousel } from 'react-bootstrap';
import '../App.css';

const Home = ({ searchTerm }) => {
  const [cars, setCars] = useState([]);
  
  // State for Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('https://localhost:7219/api/Cars');
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  // Function to open Modal with selected car details
  const handleShowDetails = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  // Function to close Modal
  const handleClose = () => {
    setShowModal(false);
    setSelectedCar(null);
  };

  const filteredCars = cars.filter(car =>
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5 pb-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-white display-5">
          FIND YOUR <span style={{ color: '#ff3b30' }}>DREAM CAR</span>
        </h1>
      </div>

      <Row>
        {filteredCars.map((car) => (
          <Col key={car.id} md={4} className="mb-4">
            <Card className="car-card h-100 shadow-lg">
              
              {/* Show First Image as Thumbnail */}
              <Card.Img 
                variant="top" 
                src={car.imageUrls && car.imageUrls.length > 0 ? car.imageUrls[0] : "https://via.placeholder.com/300"} 
                className="car-card-img"
              />

              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Card.Title className="mb-0 text-uppercase fw-bold">
                    {car.brand} {car.model}
                  </Card.Title>
                  <Badge bg="danger" className="year-badge">{car.year}</Badge>
                </div>
                <Card.Text className="price-text mb-3">
                  Rs. {car.price.toLocaleString()}
                </Card.Text>
                
                <div className="mt-auto">
                  {/* View Details Button triggers the Modal */}
                  <Button 
                    className="w-100 btn-automobile"
                    onClick={() => handleShowDetails(car)}
                  >
                    View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* --- CAR DETAILS POPUP (MODAL) --- */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton style={{ backgroundColor: '#1e1e1e', borderBottom: '1px solid #333' }}>
          <Modal.Title className="text-white">
            {selectedCar?.brand} <span style={{ color: '#ff3b30' }}>{selectedCar?.model}</span>
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body style={{ backgroundColor: '#121212', color: 'white' }}>
          {selectedCar && (
            <>
              {/* Image Slider (Carousel) */}
              <Carousel className="mb-4">
                {selectedCar.imageUrls && selectedCar.imageUrls.length > 0 ? (
                  selectedCar.imageUrls.map((img, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        src={img}
                        alt={`Slide ${index}`}
                        style={{ height: '400px', objectFit: 'cover', borderRadius: '10px' }}
                      />
                    </Carousel.Item>
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </Carousel>

              {/* Car Details */}
              <h4>Vehicle Details</h4>
              <p><strong>Year:</strong> {selectedCar.year}</p>
              <p><strong>Price:</strong> Rs. {selectedCar.price.toLocaleString()}</p>
              <p className="text-muted">
                This is a premium {selectedCar.brand} {selectedCar.model} in excellent condition. 
                Contact us for a test drive today!
              </p>
              
              <Button variant="success" size="lg" className="w-100 mt-3 fw-bold">
                📞 CALL TO BUY
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>

    </Container>
  );
};

export default Home;