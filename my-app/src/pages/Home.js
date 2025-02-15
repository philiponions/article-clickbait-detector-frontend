import React from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const Home = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100vh' }}>
            <h1>Article Clickbait Detector</h1>
            <p>Check if an article is clickbait or legit</p>
            <div>
                <TextField id="outlined-basic" label="Enter URL" variant="outlined" style={{ width: '600px' }} />
                <br></br>
                <Button style={{ marginTop: '20px' }} variant="contained">Generate Report</Button>
            </div>
        </div>
    );
};

export default Home;