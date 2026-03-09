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
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Box sx={{
          p: { xs: 2, sm: 4 },
          backgroundColor: '#000000',
          borderRadius: '30px',
          border: '1px solid rgba(255, 42, 42, 0.2)'
        }}>
          <Typography
            variant="h3"
            sx={{
              mb: 5,
              color: '#ffffff',
              textAlign: 'center',
              fontWeight: 800,
              fontFamily: "'Poppins', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}
          >
            IBL <span style={{ color: '#ff2a2a' }}>Gallery</span>
          </Typography>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              sx={{
                backgroundColor: '#0a0a0a',
                color: '#ffffff',
                border: '1px solid rgba(255, 42, 42, 0.3)',
                borderRadius: '8px',
                '& .MuiSelect-select': {
                  py: 2
                },
                '& .MuiSvgIcon-root': {
                  color: '#ff2a2a'
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: '#0a0a0a',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 42, 42, 0.3)',
                    '& .MuiMenuItem-root': {
                      '&:hover': {
                        bgcolor: 'rgba(255, 42, 42, 0.2)'
                      },
                      '&.Mui-selected': {
                        bgcolor: 'rgba(255, 42, 42, 0.3)',
                        '&:hover': {
                          bgcolor: 'rgba(255, 42, 42, 0.4)'
                        }
                      }
                    }
                  }
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
                  overflow: 'hidden',
                  borderRadius: '15px',
                  border: '1px solid rgba(255,42,42,0.1)',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: '0 10px 20px rgba(255, 42, 42, 0.3)',
                    border: '1px solid rgba(255,42,42,0.5)'
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