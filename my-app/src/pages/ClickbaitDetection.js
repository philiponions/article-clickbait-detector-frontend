import { Chip, Typography, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ClickbaitDetection = () => {
  const [reportData, setReportData] = useState({});
  const location = useLocation();
  const { content } = location.state || {};

  const publishReport = () => {
    const data = {
      thumbnail: content.thumbnail_url,
      title: content.title,
      url: content?.url,
      website: reportData.website,
      percentage: reportData.percentage,
      explanation: reportData.explanation,
      tldr: reportData.tldr,
      dislikes: 0,
      likes: 0
    };
    console.log(data);

    fetch('http://localhost:8000/add-report/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Report published successfully.");
        window.location.href = '/community';
      })
      .catch((error) => {
        console.error('Error publishing report:', error);
        alert("An error occurred while publishing the report.");
      });
  };

  useEffect(() => {
    if (content) {
      const sanitizedContent = content.data.replace(/[\n\r\t\s\\]+/g, ' ').trim();
      
      // Fetch the report data based on the URL
      fetch('http://localhost:8000/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: content.url,
          content: sanitizedContent,
          thumbnail: ""
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data._id) {
            window.location.href = `/reports/${data._id}`;
          } else {
            setReportData(data);
          }
        })
        .catch((error) => console.error('Error fetching report:', error));
    }
  }, [content]);

  useEffect(() => {
    console.log(content.thumbnail_url); // Fix typo
  }, [content]);

  // If reportData is not available yet, show skeleton loading
  if (!reportData || !reportData.percentage) {
    return (
      <div
        style={{
          padding: '10px',
          maxWidth: '1200px',
          margin: '0 auto',
          marginTop: 15,
          marginBottom: 15,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          backgroundColor: 'white',
          color: 'black',
        }}
      >
        <Skeleton variant="text" width="80%" height={50} style={{ marginBottom: '10px' }} />
        <Skeleton variant="rectangular" width="50%" height={50} style={{ marginBottom: '10px' }} />
        <Skeleton variant="rectangular" width="100%" height={200} />
        <Skeleton variant="text" width="100%" height={20} style={{ marginTop: '10px' }} />
      </div>
    );
  }

  // Render the report details once data is available
  return (
    <div
      style={{
        padding: '10px',
        maxWidth: '1200px', // Set max width for the container
        margin: '0 auto', // Center the container horizontally
        marginTop: 15,
        marginBottom: 15,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: 'white', color: "black", 
        borderRadius: '8px', // Optional rounded corners for aesthetics
      }}
    >
      <Typography variant="h4" style={{ marginTop: 15 }}>
        {content.title}
      </Typography>
      <img
        src={content.thumbnail_url}
        alt={content.thumbnail_url}
        style={{ width: '50%', height: 'auto', marginBottom: 10 }}
      />
      <h1 style={{ textAlign: 'left' }}>Analysis Report</h1>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
        <h3>Clickbait Score</h3>
        <p style={{ marginLeft: 10 }}>{`${reportData.percentage}%`}</p>
      </div>
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
            backgroundColor: reportData.percentage > 75 ? 'red' : reportData.percentage >= 25 ? 'orange' : 'green',
          }}
        ></div>
      </div>
      <Typography style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
        <p style={{ margin: 0 }}>
          <strong>Verdict:</strong>
        </p>
        <Chip
          style={{ marginLeft: 10 }}
          label={
            reportData.percentage > 75
              ? 'Clickbait'
              : reportData.percentage >= 25
              ? 'Mixed'
              : 'Legit'
          }
          sx={{
            backgroundColor:
              reportData.percentage > 75
                ? 'red'
                : reportData.percentage >= 25
                ? 'orange'
                : 'green',
            color: 'white',
          }}
        />
      </Typography>
      <h2>Explanation</h2>
      <p>{reportData.explanation}</p>
      <h3>TLDR;</h3>
      <p>{reportData.tldr}</p>
      <button
        id="publish-report"
        onClick={publishReport}
        style={{
          display: 'block',
          margin: '20px auto',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Publish Report
      </button>
    </div>
  );
};

export default ClickbaitDetection;
