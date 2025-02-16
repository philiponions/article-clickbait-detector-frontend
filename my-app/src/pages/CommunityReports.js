// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import CardList from '../components/CardList';
import { Button, Stack } from '@mui/material';


const CommunityReports = () => {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', height: '100vh', margin: 20 }}>
      <div>
        <div>
          <h1>Community Reports</h1>
          <div id='pagination' style={{ marginBottom: '20px', float: 'right' }}>
            <Stack direction="row" spacing={2}>
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
        <CardList list={currentReports} />
      </div>
    </div>
  );
};

export default CommunityReports;