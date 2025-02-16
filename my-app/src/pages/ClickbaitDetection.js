// src/pages/ClickbaitDetection.js
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
      fetch('https://api.example.com/generate-report', {
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



  return (
    <div style={{ padding: '20px' }}>
      <h1>Clickbait Detection Report</h1>
      {reportData ? (
        <div>
          <h2>Summary</h2>
          <p>{reportData.summary}</p>
          <h3>Key Points</h3>
          <ul>
            {reportData.keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
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
      ) : (
        <p>Loading report...</p>
      )}
    </div>
  );
};

export default ClickbaitDetection;