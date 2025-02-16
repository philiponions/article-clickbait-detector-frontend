import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Chip } from '@mui/material';

const ReportDetails = () => {
  const location = useLocation();
  const report = location.state?.report;

  if (!report) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{report.title}</h1>
      <img src={report.thumbnail} alt={report.title} style={{ width: '30%', height: 'auto' }} />
      <p><strong>Website:</strong> {report.website}</p>
      <p><strong>URL:</strong> <a href={report.url} target="_blank" rel="noopener noreferrer">{report.url}</a></p>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
        <p style={{ margin: 0 }}><strong>Verdict:</strong></p>
        <Chip 
          style={{ marginLeft: 10 }}
          label={
            report.percentage > 75 ? "Clickbait" : 
            report.percentage >= 25 ? "Mixed" : 
            "Legit"
          } 
          color={
            report.percentage > 75 ? "error" : 
            report.percentage >= 25 ? "warning" : 
            "success"
          }
        />
      </div>
      <p><strong>Clickbait Score:</strong> {report.percentage}%</p>
      <p><strong>Explanation:</strong> {report.explanation}</p>
      <p><strong>TLDR:</strong> {report.tldr}</p>
    </div>
  );
};

export default ReportDetails;