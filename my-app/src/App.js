import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ClickbaitDetection from './pages/ClickbaitDetection';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clickbait-detection" element={<ClickbaitDetection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;