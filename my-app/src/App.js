import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ClickbaitDetection from './pages/ClickbaitDetection';
import CommunityReports from './pages/CommunityReports';
import Navbar from './components/Navbar';
import About from './pages/About';
import ReportDetails from './pages/ReportDetails'; // Import the new ReportDetails component

function App() {
  const backgroundImage = 'path/to/your/image.jpg'; // Update with your image path

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #6e8efb, #a777e3)', 
      color: 'white', 
      display: "flex", 
      flexDirection: "column",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '180vh'
    }}>
      <BrowserRouter>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clickbait-detection" element={<ClickbaitDetection />} />
            <Route path="/community" element={<CommunityReports />} />
            <Route path="/about" element={<About />} />
            <Route path="/reports/:id" element={<ReportDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;