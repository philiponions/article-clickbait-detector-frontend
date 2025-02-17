// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import CardList from '../components/CardList';
import { Button, Stack, TextField } from '@mui/material';


const CommunityReports = () => {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const reportsPerPage = 12;

  useEffect(() => {
    // Fetch the report data based on the URL
    // Replace with your actual API endpoint
    fetch('http://localhost:8000/reports', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        // Access the "reports" field from the response
        setReports(data.reports);
      })
      .catch((error) => console.error('Error fetching report:', error));
  }, []);

  useEffect(() => {
    console.log(reports);

  }, [reports]);
  
  // Calculate the reports to display on the current page
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(reports.length / reportsPerPage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100vh', margin: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
        <div id='pagination' style={{ display: "flex", justifyContent: "space-between", marginBottom: '20px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: 'white', width: "100%"}}>
          <h1 style={{ color: 'black' }}>Community Reports</h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
                label="Search"
                variant="outlined"
                style={{marginRight: 10}}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{ style: { color: 'black' } }}
                InputLabelProps={{ style: { color: 'black' } }}
              />
              <Stack direction="row" spacing={2} >
                <Button
                  variant={currentPage > 1 ? 'outlined' : 'disabled'}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  {'<'}
                </Button>
                <Button variant="contained">{currentPage}</Button>
                <Button
                  variant={currentPage < totalPages ? 'outlined' : 'disabled'}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  {'>'}
                </Button>
              </Stack>
          </div>
        </div>
      </div>
      <CardList list={currentReports} />
    </div>
  );
};

export default CommunityReports;