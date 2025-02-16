import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ClickbaitDetection from './pages/ClickbaitDetection';
import CommunityReports from './pages/CommunityReports';
import Navbar from './components/Navbar';
import About from './pages/About';
import ReportDetails from './pages/ReportDetails'; // Import the new ReportDetails component

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/clickbait-detection" element={<ClickbaitDetection />} />
        <Route path="/community" element={<CommunityReports/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/report/:title" element={<ReportDetails />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;