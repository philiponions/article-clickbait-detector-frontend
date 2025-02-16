// src/pages/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const About = () => {
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
      <h1>About Clickbait Detector</h1>
     <div style={{marginLeft: 100, marginRight: 100, fontSize: 20}}>
     The internet is full of <b>clickbait nonsense</b>, especially when it comes to movies and video games. Upcoming releases get flooded with misleading headlines that overpromise and underdeliver—titles that claim big news but offer nothing but speculation and fluff.
    <br></br>
    <div style={{marginTop: 25}}>

        "GTA 7 confirmed???"—No, it's just a director casually mentioning the idea. <b>But you had to waste time reading to find that out. </b>Even skimming these articles eats up valuable seconds or minutes.
    </div>
    <div style={{marginTop: 25}}>

        That's where our app comes in. We use AI to summarize articles and determine whether they’re legit or just clickbait garbage—<b>saving you time and frustration with a quick and accurate verdict.</b>
    </div>
     </div>
    </div>
  );
};

export default About;