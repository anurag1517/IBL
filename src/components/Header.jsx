import React from 'react';
import { Box, Typography } from '@mui/material';

const Header = () => {
  return (
    <Box 
      sx={{ 
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}
    >
      <Typography variant="h2" component="h1">
        IBL 4.0
      </Typography>
      <Typography variant="h5">
        IIEST Basketball League
      </Typography>
    </Box>
  );
};

export default Header;