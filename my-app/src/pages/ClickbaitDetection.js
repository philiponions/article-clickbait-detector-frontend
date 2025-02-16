// src/pages/ClickbaitDetection.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


const ClickbaitDetection = () => {
  const [reportData, setReportData] = useState(null);
  const location = useLocation();
  const { url } = location.state || {};
  const CLICKBAIT_THRESHOLD = '75%';
  const num_CLICKBAIT_THRESHOLD = 75;


  useEffect(() => {
    if (url) {
      // Fetch the report data based on the URL
      fetch('https://jsonplaceholder.typicode.com/posts/1')
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
          <p>{reportData.body}</p>
          <h3>Key Points</h3>
          <ul>
            <li>{reportData.title}</li>
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

          {/* Conditional Rendering for Warning Message */}
          {num_CLICKBAIT_THRESHOLD > 50 && (
            <div
              style={{
                marginTop: '10px',
                padding: '10px',
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '5px',
              }}
            >
              Warning: This is likely clickbait.
            </div>
          )}
          <h3>Explanation</h3>
          <p>This is a placeholder explanation.</p>
        </div>
      ) : (
        <p>Loading report...</p>
      )}
    </div>
  );
};

export default ClickbaitDetection;