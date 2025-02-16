import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

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
      <p><strong>Verdict:</strong> {report.verdict}</p>
      <p><strong>Meter:</strong> {report.meter}%</p>
      <p><strong>Summary:</strong> {report.summary}</p>
      <p><strong>Explanation:</strong> {report.explanation}</p>
    </div>
  );
};

export default ReportDetails;