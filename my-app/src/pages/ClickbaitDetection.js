import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ClickbaitDetection = () => {
  const [reportData, setReportData] = useState(null);
  const location = useLocation();
  const { url } = location.state || {};

  useEffect(() => {
    if (url) {
      // Fetch the report data based on the URL
      // Replace with your actual API endpoint
      fetch('http://localhost:8000/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })
        .then((response) => response.json())
        .then((data) => setReportData(data))
        .catch((error) => console.error('Error fetching report:', error));
    }
  }, [url]);

  if (!reportData) {
    return <div>Loading report...</div>;
  }

  // If reportData is loaded, render the report details
  return (
    <div
      style={{
        padding: '10px',
        maxWidth: '1200px', // Set max width for the container
        margin: '0 auto', // Center the container horizontally
        
        borderRadius: '8px', // Optional rounded corners for aesthetics
      }}
    >
      <h1 style={{ textAlign: 'center' }}>Clickbait Detection Report</h1>
      <h2>Summary</h2>
      <p>{reportData.summary}</p>
      <h3>Key Points</h3>
      {/* Check if keyPoints exists and is an array before calling map */}
      {Array.isArray(reportData.keyPoints) && reportData.keyPoints.length > 0 ? (
        <ul>
          {reportData.keyPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      ) : (
        <p>No key points available.</p>
      )}
      <h3>Clickbait Score</h3>
      <div
        style={{
          width: '100%',
          height: '20px',
          backgroundColor: '#ccc',
          borderRadius: '5px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${reportData.percentage}%`,
            height: '100%',
            backgroundColor: reportData.percentage > 50 ? 'red' : 'green',
          }}
        ></div>
      </div>
      <h3>Explanation</h3>
      <p>{reportData.explanation}</p>
    </div>
  );
};

export default ClickbaitDetection;