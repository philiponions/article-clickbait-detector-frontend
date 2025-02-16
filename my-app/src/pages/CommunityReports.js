// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import CardList from '../components/CardList';

const CommunityReports = () => {
    const [reports, setReports] = useState([]);
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
    
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100vh', margin: 20 }}>
        <div>
            <h1>Community Reports</h1>
            <CardList list={reports}
                />
        </div>
    </div>
  );
};

export default CommunityReports;