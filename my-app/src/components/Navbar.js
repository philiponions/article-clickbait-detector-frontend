import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <img src="/Magnifying_glass_icon.svg" alt="Robot Icon" style={{ width: '25px', height: '25px', marginRight: '10px', filter: 'invert(1)' }} />
          <div>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                Clickbait Detector
            </Typography>           
          </div>
          <div>
          <Typography
                component="a"
                href="/community"
                sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                }}
            >
                Community
            </Typography>  
            <Typography
                style={{marginLeft: 10}}
                component="a"
                href="/about"
                sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                }}
            >
                About
            </Typography>  
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
