import { useParams } from 'react-router-dom';
import { Chip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import { Button, Typography, Stack } from '@mui/material';
import defaultThumbnail from '../components/default.png';

const ReportDetails = () => {
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    useEffect(() => {
        console.log("Fetching report with id:", id);
        // Fetch the report details based on the id
        fetch(`http://localhost:8000/reports/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setReport(data.report);
            })
            .catch((error) => console.error('Error fetching report details:', error));
    }, [id]);

    if (!report) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{
            padding: '10px',
            maxWidth: '1200px', // Set max width for the container
            margin: '0 auto', // Center the container horizontally
            borderRadius: '8px', // Optional rounded corners for aesthetics
        }}
        >
            <Typography variant="h4">{report.title}</Typography>
            <img src={report.thumbnail && report.thumbnail.startsWith('http') ? report.thumbnail : defaultThumbnail} alt={report.title} style={{ width: '30%', height: 'auto', marginBottom: 10 }} />
            <Typography>
                <a href={report.url} target="_blank" rel="noopener noreferrer">
                    Article Link
                </a>
            </Typography>

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
                        width: `${report.percentage}%`,
                        height: '100%',
                        backgroundColor: report.percentage > 50 ? 'red' : 'green',
                    }}
                ></div>
            </div>
            <Typography style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
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
            </Typography>
            <h2>Summary</h2>
            <p>{report.summary}</p>
            <h3>Explanation</h3>
            <p>{report.explanation}</p>
            {/* Like / Dislike Buttons */}
            <Stack direction="row" spacing={3} alignItems="center" sx={{ marginTop: 2 }}>
                {/* Like */}
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>{likes}</Typography>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<ThumbUp />}
                        onClick={() => setLikes(likes + 1)}
                    >
                        Like
                    </Button>
                </Stack>

                {/* Dislike */}
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>{dislikes}</Typography>
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<ThumbDown />}
                        onClick={() => setDislikes(dislikes + 1)}
                    >
                        Dislike
                    </Button>
                </Stack>
            </Stack>
        </div>
    );
};

export default ReportDetails;
