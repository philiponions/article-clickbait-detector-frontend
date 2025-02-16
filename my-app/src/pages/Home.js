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
      // const response = await fetch('http://localhost:8080/api/link', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ link: url }),
      // });

      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      const fake_data = {
        "percentage": "80",
        "explanation": "The titles all make it seem like Bloodborne is actively coming back in a major way (new release, remaster, etc.). However, the articles are about smaller things like a concert with Bloodborne music, a limited edition guide, a 60fps mod being taken down (interpreted as a hint), the soundtrack being added to Spotify, and an Astro Bot costume. The articles stretch these minor events to imply a bigger return, which is misleading. The articles are definitely playing on the hopes of Bloodborne fans to generate clicks.",
        "tldr": "The articles sensationalize minor Bloodborne-related events as major returns, which is misleading and clickbait-y.",
        "url": "http://localhost:3000/community",
        "website": "localhost:3000"
    }

      // Navigate to the Clickbait Detection page with the URL as state
      navigate('/clickbait-detection', { state: { url, fake_data } });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}></div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/Magnifying_glass_icon.svg" alt="Robot Icon" style={{ width: '25px', height: '25px', marginRight: '10px' }} />
        <h1>Article Clickbait Detector</h1>
      </div>
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