import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes
import NavBar from './components/NavBar';
import Home from './components/Home';
import Admin from './components/Admin'; // Import the new Admin page
import './App.css';
import Login from './components/Login';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

 return (
    <div className="App">
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        
        {}
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;