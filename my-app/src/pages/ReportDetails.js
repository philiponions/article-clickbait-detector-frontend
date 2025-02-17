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
  const [likeState, setLikeState] = useState(0); // 0 for no action, 1 for liked, 2 for disliked

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
        setLikes(data.report.likes);
        setDislikes(data.report.dislikes);
      })
      .catch((error) => console.error('Error fetching report details:', error));
  }, [id]);

  const handleLike = () => {
    let reaction = 'like';
    
    setLikes(likes + 1);
    if (likeState === 2) {
      setDislikes(dislikes - 1);
      setLikeState(1);
    }  else if (likeState === 1) {
      setLikeState(0);
      setLikes(likes - 1);
      reaction = 'unlike';
    } else {
      setLikeState(1);
    }

    fetch(`http://localhost:8000/reports/${id}/reaction?reaction=${reaction}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (dislikes === 1) {
      fetch(`http://localhost:8000/reports/${id}/reaction?reaction=undislike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
    let reaction = 'dislike';
    
    if (likeState === 1) {
      setLikes(likes - 1);
      setLikeState(2);
    } else if (likeState === 2) {
      setLikeState(0);
      setDislikes(dislikes - 1);
      reaction = 'undislike';
    } else {
      setLikeState(2);
    }

    fetch(`http://localhost:8000/reports/${id}/reaction?reaction=${reaction}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (likes === 1) {
      fetch(`http://localhost:8000/reports/${id}/reaction?reaction=unlike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  };

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
      <img src={report.thumbnail} alt={report.title} style={{ width: '30%', height: 'auto', marginBottom: 10 }} />
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
        backgroundColor: report.percentage > 75 ? 'red' : report.percentage >= 25 ? 'orange' : 'green',
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
        sx={{
        backgroundColor: report.percentage > 75 ? 'red' : report.percentage >= 25 ? 'orange' : 'green',
        color: 'white'
        }}
      />
      </Typography>      
      <h2>Explanation</h2>
      <p>{report.explanation}</p>
      <h3>TLDR;</h3>
      <p>{report.tldr}</p>
      <div style={{marginTop: 50}}>             
      <Stack direction="row" spacing={3} alignItems="center" sx={{ marginTop: 2 }}>
        {/* Like */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>{likes}</Typography>
            <Button
              variant="contained"
              color="success"
              startIcon={<ThumbUp />}
              onClick={handleLike}
            >
            </Button>
          </Stack>
          <Typography></Typography>
          {/* Dislike */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>{dislikes}</Typography>
            <Button
              variant="contained"
              color="error"
              startIcon={<ThumbDown />}
              onClick={handleDislike}
            >
            </Button>
          </Stack>
        </Stack>
      </div>
      <Typography style={{ fontSize: '0.8em', color: 'grey', marginTop: 20 }}>
        Give feedback on the AI's judgment by liking or disliking this response.
      </Typography>
    </div>
  );
  
};

export default ReportDetails;
