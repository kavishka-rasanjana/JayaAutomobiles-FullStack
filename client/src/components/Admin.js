import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import AddCar from './AddCar'; 
import { useNavigate } from 'react-router-dom'; // Navigate පාවිච්චි කරන්න ඕන

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Page එක Load වෙද්දී Token එක තියෙනවද බලනවා
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Token එක නැත්නම් Login එකට එළවනවා
      alert("Please login first!");
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 text-danger">Admin Dashboard</h2>
      {/* ... අනිත් කෝඩ් ටික එහෙමම තියන්න ... */}
      <AddCar />
    </Container>
  );
};

export default Admin;