import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';

const Navbar = () => {
  const [statsAnchorEl, setStatsAnchorEl] = useState(null);
  const location = useLocation();

  const handleStatsClick = (event) => {
    setStatsAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setStatsAnchorEl(null);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        background: 'transparent',
      }}
    >
      <Toolbar 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          py: { xs: 1, sm: 1.5, md: 2 },
          px: { xs: 1, sm: 2, md: 3 },
          flexWrap: 'wrap',
          gap: 1
        }}
      >
        {/* Left: Logo */}
        <Box sx={{ flex: '1' }}>
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/" 
            sx={{ 
              textDecoration: 'none',
              color: 'black',
              fontWeight: 'bold',
              padding: '8px 16px',
              borderRadius: '4px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white'
              }
            }}
          >
            IBL 4.0
          </Typography>
        </Box>

        {/* Center: Navigation items */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          gap: 3,
          flex: '2',
        }}>
          {['fixtures', 'teams', 'points-table', 'stats'].map((item) => (
            <Button 
              key={item}
              component={RouterLink} 
              to={`/${item}`}
              sx={{ 
                color: 'black',
                borderBottom: isActiveRoute(`/${item}`) ? '2px solid black' : 'none',
                borderRadius: '4px',
                padding: '8px 16px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  color: 'white',
                  borderBottom: 'none'
                }
              }}
            >
              {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Button>
          ))}
        </Box>

        {/* Right: Admin button */}
        {/* <Box sx={{ flex: '1', display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            component={RouterLink} 
            to="/admin"
            sx={{ 
              color: 'black',
              borderBottom: isActiveRoute('/admin') ? '2px solid black' : 'none',
              borderRadius: '4px',
              padding: '8px 16px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                borderBottom: 'none'
              }
            }}
          >
            Admin
          </Button>
        </Box> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;