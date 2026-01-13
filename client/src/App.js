import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css'; // Import Custom Premium Styles

// Import Components
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Admin from './components/Admin';
import Footer from './components/Footer';

function App() {
  // --- Lifting State Up ---
  // We keep the 'searchTerm' here so we can pass it to:
  // 1. NavBar (to update the input)
  // 2. Home (to filter the car list)
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      {/* Layout Wrapper:
        'd-flex flex-column min-vh-100' ensures the footer stays at the bottom
        even if the page content is short.
      */}
      <div className="d-flex flex-column min-vh-100">
        
        {/* Pass state to NavBar for the Search Input */}
        <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Define Routes */}
        <Routes>
          {/* Home Page: Receives searchTerm to filter cars */}
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          
          {/* Admin Login Page */}
          <Route path="/login" element={<Login />} />
          
          {/* Admin Dashboard (Protected inside the component) */}
          <Route path="/admin" element={<Admin />} />
        </Routes>

        {/* Footer Component (Always at the bottom) */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;