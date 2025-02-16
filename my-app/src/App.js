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
<<<<<<< HEAD
    <BrowserRouter>
    <Navbar/>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/clickbait-detection" element={<ClickbaitDetection />} />
        <Route path="/community" element={<CommunityReports/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/reports/:id" element={<ReportDetails />} /> 
      </Routes>
    </BrowserRouter>
=======
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clickbait-detection" element={<ClickbaitDetection />} />
          <Route path="/community" element={<CommunityReports />} />
          <Route path="/about" element={<About />} />
          <Route path="/report/:title" element={<ReportDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
>>>>>>> 99a198ca3c43a5623d92e4ded8dbbecb0b6890ac
  );
}

export default App;