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

const Gallery = ({ galleryData = {} }) => {
  const [selectedYear, setSelectedYear] = useState('2025');

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
            {(galleryData[selectedYear] || []).map((item, index) => (
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
                  src={item}
                  alt={`IBL ${selectedYear} highlight`}
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