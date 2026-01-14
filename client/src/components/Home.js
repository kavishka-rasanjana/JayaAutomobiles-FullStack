import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Badge, Modal, Carousel, Form } from 'react-bootstrap';
import '../App.css';

const Home = ({ searchTerm }) => {
  const [cars, setCars] = useState([]);
  
  // --- States for View Details Modal ---
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  // --- States for Comparison Tool ---
  const [comparisonList, setComparisonList] = useState([]); // Stores selected cars
  const [showCompareModal, setShowCompareModal] = useState(false); // Controls Compare Modal

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

  // --- Comparison Logic ---
  
  // Function to add/remove car from comparison list
  const toggleCompare = (car) => {
    // Check if car is already selected
    const isSelected = comparisonList.find(c => c.id === car.id);

    if (isSelected) {
      // If selected, remove it
      setComparisonList(comparisonList.filter(c => c.id !== car.id));
    } else {
      // If not selected, check limit (Max 2 cars)
      if (comparisonList.length < 2) {
        setComparisonList([...comparisonList, car]);
      } else {
        alert("You can only compare 2 cars at a time!");
      }
    }
  };

  // Check if a specific car is currently selected for comparison
  const isCarSelected = (carId) => {
    return comparisonList.some(c => c.id === carId);
  };

  // --- View Details Logic ---
  const handleShowDetails = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedCar(null);
  };

  // Filter cars based on search
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
            <Card className="car-card h-100 shadow-lg position-relative">
              
              {/* --- 1. COMPARE CHECKBOX (New Feature) --- */}
              <div 
                className={`compare-checkbox ${isCarSelected(car.id) ? 'active' : ''}`}
                onClick={() => toggleCompare(car)}
              >
                {isCarSelected(car.id) ? '✅ Selected' : '+ Compare'}
              </div>

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

      {/* --- 2. FLOATING COMPARE BAR (Shows when cars are selected) --- */}
      {comparisonList.length > 0 && (
        <div className="floating-compare-bar">
          <span className="text-white fw-bold">
            {comparisonList.length} / 2 Cars Selected
          </span>
          <Button 
            variant="danger" 
            className="rounded-pill px-4 fw-bold"
            disabled={comparisonList.length < 2} // Disable button if only 1 car selected
            onClick={() => setShowCompareModal(true)}
          >
            COMPARE NOW 🆚
          </Button>
          <Button 
            variant="outline-light" 
            size="sm" 
            className="rounded-circle"
            onClick={() => setComparisonList([])} // Clear list
          >
            ✕
          </Button>
        </div>
      )}

      {/* --- 3. COMPARISON MODAL POPUP --- */}
      <Modal show={showCompareModal} onHide={() => setShowCompareModal(false)} size="xl" centered>
        <Modal.Header closeButton style={{ backgroundColor: '#1e1e1e', borderBottom: '1px solid #333' }}>
          <Modal.Title className="text-white fw-bold">VEHICLE <span style={{ color: '#ff3b30' }}>COMPARISON</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#121212', color: 'white' }}>
          
          {comparisonList.length === 2 && (
            <table className="compare-table">
              <thead>
                <tr>
                  <th style={{ width: '20%' }} className="text-muted">Feature</th>
                  {/* Car 1 Header */}
                  <th style={{ width: '40%' }}>
                    <h4 className="text-uppercase text-danger">{comparisonList[0].brand} {comparisonList[0].model}</h4>
                  </th>
                  {/* Car 2 Header */}
                  <th style={{ width: '40%' }}>
                    <h4 className="text-uppercase text-danger">{comparisonList[1].brand} {comparisonList[1].model}</h4>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Image Comparison */}
                <tr>
                  <td>Image</td>
                  <td>
                    <img src={comparisonList[0].imageUrls[0]} className="compare-header-img" alt="Car 1" />
                  </td>
                  <td>
                    <img src={comparisonList[1].imageUrls[0]} className="compare-header-img" alt="Car 2" />
                  </td>
                </tr>
                {/* Price Comparison */}
                <tr>
                  <td className="fw-bold">Price</td>
                  <td className="fs-4 fw-bold">Rs. {comparisonList[0].price.toLocaleString()}</td>
                  <td className="fs-4 fw-bold">Rs. {comparisonList[1].price.toLocaleString()}</td>
                </tr>
                {/* Year Comparison */}
                <tr>
                  <td className="fw-bold">Year</td>
                  <td>
                    <Badge bg="secondary" className="fs-6">{comparisonList[0].year}</Badge>
                  </td>
                  <td>
                    <Badge bg="secondary" className="fs-6">{comparisonList[1].year}</Badge>
                  </td>
                </tr>
                {/* Brand Comparison */}
                <tr>
                  <td className="fw-bold">Brand</td>
                  <td className="text-uppercase">{comparisonList[0].brand}</td>
                  <td className="text-uppercase">{comparisonList[1].brand}</td>
                </tr>
              </tbody>
            </table>
          )}

        </Modal.Body>
      </Modal>

      {/* --- EXISTING VIEW DETAILS MODAL --- */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
         {/* ... (This part remains same as previous code, keeping your details popup working) ... */}
         {/* For brevity, assume the previous Details Modal code is here. 
             If you copy-paste, ensure you keep the Details Modal from the previous step inside here. */}
         <Modal.Header closeButton style={{ backgroundColor: '#1e1e1e', borderBottom: '1px solid #333' }}>
          <Modal.Title className="text-white">
            {selectedCar?.brand} <span style={{ color: '#ff3b30' }}>{selectedCar?.model}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#121212', color: 'white' }}>
          {selectedCar && (
            <>
              <Carousel className="mb-4">
                {selectedCar.imageUrls && selectedCar.imageUrls.length > 0 ? (
                  selectedCar.imageUrls.map((img, index) => (
                    <Carousel.Item key={index}>
                      <img className="d-block w-100" src={img} alt={`Slide ${index}`} style={{ height: '400px', objectFit: 'cover', borderRadius: '10px' }} />
                    </Carousel.Item>
                  ))
                ) : (<p>No images available</p>)}
              </Carousel>
              <h4>Vehicle Details</h4>
              <p><strong>Year:</strong> {selectedCar.year}</p>
              <p><strong>Price:</strong> Rs. {selectedCar.price.toLocaleString()}</p>
              <Button variant="success" size="lg" className="w-100 mt-3 fw-bold">📞 CALL TO BUY</Button>
            </>
          )}
        </Modal.Body>
      </Modal>

    </Container>
  );
};

export default Home;