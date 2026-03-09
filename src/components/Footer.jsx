import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: '#050505',
        borderTop: '1px solid rgba(255, 42, 42, 0.2)',
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="body1"
          align="center"
          sx={{ color: '#aaaaaa', fontFamily: "'Montserrat', sans-serif", mb: 1 }}
        >
          © {new Date().getFullYear()} IBL5.0 All rights reserved.
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ color: '#666666', fontFamily: "'Montserrat', sans-serif" }}
        >
          <Link
            href="#"
            sx={{
              color: '#666666',
              textDecoration: 'none',
              transition: 'color 0.2s',
              '&:hover': {
                color: '#ff2a2a',
              }
            }}
          >
            Privacy Policy
          </Link>
          {' | '}
          <Link
            href="#"
            sx={{
              color: '#666666',
              textDecoration: 'none',
              transition: 'color 0.2s',
              '&:hover': {
                color: '#ff2a2a',
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