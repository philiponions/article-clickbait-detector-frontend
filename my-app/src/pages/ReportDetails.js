import { useLocation, useParams } from 'react-router-dom';
import { Chip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import { Button, Typography, Stack } from '@mui/material';

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
        <div style={{ padding: 20 }}>
            <Typography variant="h4">{report.title}</Typography>
            <img src={report.thumbnail} alt={report.title} style={{ width: '30%', height: 'auto', marginBottom: 10 }} />
            <Typography><strong>Website:</strong> {report.website}</Typography>
            <Typography>
                <strong>URL:</strong>{' '}
                <a href={report.url} target="_blank" rel="noopener noreferrer">
                    {report.url}
                </a>
            </Typography>
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
            <Typography><strong>Meter:</strong> {report.percentage}%</Typography>
            <Typography><strong>Summary:</strong> {report.summary}</Typography>
            <Typography><strong>Explanation:</strong> {report.explanation}</Typography>

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
