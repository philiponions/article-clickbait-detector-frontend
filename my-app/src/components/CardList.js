import React from 'react';
import { Card, CardContent, Typography, CardMedia, Grid, Badge, Chip } from '@mui/material';

const data = [
  {
    title: 'GTA 6 gameplay leaks: Explorable buildings, destructibility, and more coming in fall 2025',
    website: 'hindustantimes',
    thumbnail: 'https://images.hindustantimes.com/tech/img/2025/02/10/1600x900/3_1724223508344_1739169241348.jpg',
    percentage: 80,
  },
  {
    title: 'GTA 6 gameplay leaks: Explorable buildings, destructibility, and more coming in fall 2025',
    website: 'hindustantimes',
    thumbnail: 'https://images.hindustantimes.com/tech/img/2025/02/10/1600x900/3_1724223508344_1739169241348.jpg',
    percentage: 80,
  },
  {
    title: 'GTA 6 gameplay leaks: Explorable buildings, destructibility, and more coming in fall 2025',
    website: 'hindustantimes',
    thumbnail: 'https://images.hindustantimes.com/tech/img/2025/02/10/1600x900/3_1724223508344_1739169241348.jpg',
    percentage: 80,
  },
  {
    title: 'GTA 6 gameplay leaks: Explorable buildings, destructibility, and more coming in fall 2025',
    website: 'hindustantimes',
    thumbnail: 'https://images.hindustantimes.com/tech/img/2025/02/10/1600x900/3_1724223508344_1739169241348.jpg',
    percentage: 80,
  },
];

const CardComponent = ({ title, website, thumbnail, percentage }) => (
    <Card
    sx={{
      minWidth: 350, // Increased minimum width
      width: '100%', // Ensures the card takes up full available width
      marginRight: 100, // Adds some space below each card
    }}
  >
    <CardMedia component="img" height="140" image={thumbnail} alt={title} />
    <CardContent >
        <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%', // Ensure the typography takes up full width of the container
            }}
        >
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        website: {website}
      </Typography>
      <Typography variant="body1" color="primary">
        {percentage}%
      </Typography>
      <Chip style={{marginTop: 10}}
        label={
            percentage > 75 ? "Clickbait" : 
            percentage >= 50 ? "Mixed" : 
            "Legit"
        } 
        color={
            percentage > 75 ? "error" : 
            percentage >= 50 ? "warning" : 
            "success"
        }
    />
    </CardContent>
  </Card>
);

const CardList = (props) => {
  return (
    <Grid container spacing={2} justifyContent="left">
    {props.list.map((item, index) => (
      <Grid item key={index} xs={12} sm={6} md={3}>
        <CardComponent
          title={item.title}
          website={item.website}
          thumbnail={item.thumbnail}
          percentage={item.meter}          
        />
      </Grid>
    ))}
  </Grid>
  );
};

export default CardList;
