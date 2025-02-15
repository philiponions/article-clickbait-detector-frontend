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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Navigate to the Clickbait Detection page with the URL as state
    navigate('/clickbait-detection', { state: { url } });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100vh' }}>
      <h1>Article Clickbait Detector</h1>
      <p>Check if an article is clickbait or legit</p>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Enter URL"
          variant="outlined"
          style={{ width: '600px' }}
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
  );
};

export default Home;