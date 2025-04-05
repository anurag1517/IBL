import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  MenuItem, 
  Select, 
  FormControl, 
  ImageList, 
  ImageListItem 
} from '@mui/material';
import Footer from './Footer';

const Gallery = () => {
  const [selectedYear, setSelectedYear] = useState('2025');

  const galleryData = {
    '2022': [
      { img: 'url_to_image1', title: 'Match 1 2022' },
      { img: 'url_to_image2', title: 'Match 2 2022' },
      // Add more images
    ],
    '2023': [
      { img: 'url_to_image3', title: 'Match 1 2023' },
      { img: 'url_to_image4', title: 'Match 2 2023' },
      // Add more images
    ],
    '2024': [
      { img: 'url_to_image5', title: 'Match 1 2024' },
      { img: 'url_to_image6', title: 'Match 2 2024' },
      // Add more images
    ],
    '2025': [
      { img: 'url_to_image7', title: 'Match 1 2025' },
      { img: 'url_to_image8', title: 'Match 2 2025' },
      // Add more images
    ]
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{
          p: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2
        }}>
          <Typography 
            variant="h3" 
            sx={{ 
              mb: 4, 
              color: 'black', 
              textAlign: 'center',
              fontWeight: 'bold',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Gallery
          </Typography>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '& .MuiSelect-select': {
                  py: 2
                }
              }}
            >
              {Object.keys(galleryData).reverse().map((year) => (
                <MenuItem key={year} value={year}>IBL {year}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <ImageList 
            sx={{ 
              width: '100%', 
              height: 'auto',
              gap: 16
            }} 
            cols={3}
            rowHeight={264}
          >
            {galleryData[selectedYear].map((item, index) => (
              <ImageListItem 
                key={index}
                sx={{
                  '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.3s ease-in-out'
                  }
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    borderRadius: 8,
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%'
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Gallery;