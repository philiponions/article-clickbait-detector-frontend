// src/pages/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const Home = () => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUrl(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/scrape-data?url=${encodeURIComponent(url)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const content = await response.json();
      content["url"] = url;
      // Navigate to the Clickbait Detection page with the URL as state
      navigate('/clickbait-detection', { state: { content } });
      console.log("bye")
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}></div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/Magnifying_glass_icon.svg" alt="Robot Icon" style={{ width: '50px', height: '50px', marginRight: '10px', filter: 'invert(1)' }} />
        <h1 style={{fontSize: 60, color: 'white'}}>Article Clickbait Detector</h1>
      </div>
      <div style={{ padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: 'white', marginTop: 20, width: 600 }}>
      <center>
      </center>
      <p style={{fontSize: 15, color: "black"}}>Instantly verify if an article is legit or just clickbait.</p>
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Enter URL"
              variant="outlined"
              style={{ width: '100%' }}
              value={url}
              onChange={handleChange}
              required
            />
            <br />
            <Button
              style={{ marginTop: '20px' }}
              variant="contained"
              type="submit"
            >
              Generate Report
            </Button>
          </form>
        </div>
      </div>
  );
};

export default Home;