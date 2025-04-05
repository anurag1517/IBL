import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}
    >
      <Container maxWidth="sm">
        <Typography 
          variant="body1" 
          align="center"
          sx={{ color: 'black' }}
        >
          © {new Date().getFullYear()} IBL4.0 All rights reserved.
        </Typography>
        <Typography 
          variant="body2" 
          align="center"
          sx={{ color: 'black' }}
        >
          <Link 
            href="#" 
            sx={{ 
              color: 'black',
              '&:hover': {
                color: 'black',
                textDecoration: 'underline'
              }
            }}
          >
            Privacy Policy
          </Link>
          {' | '}
          <Link 
            href="#" 
            sx={{ 
              color: 'black',
              '&:hover': {
                color: 'black',
                textDecoration: 'underline'
              }
            }}
          >
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;