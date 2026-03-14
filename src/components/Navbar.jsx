import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navItems = ['fixtures', 'teams', 'points-table', 'stats', 'archives'];

  const drawer = (
    <List>
      <ListItem
        component={RouterLink}
        to="/"
        sx={{
          mb: 2,
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#ffffff',
            fontWeight: 'bold',
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          IBL 5.0
        </Typography>
      </ListItem>
      {navItems.map((item) => (
        <ListItem
          key={item}
          component={RouterLink}
          to={`/${item}`}
          onClick={handleDrawerToggle}
          sx={{
            backgroundColor: isActiveRoute(`/${item}`) ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
          }}
        >
          <ListItemText
            primary={item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            sx={{
              color: '#ffffff',
              '& .MuiTypography-root': {
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500
              }
            }}
          />
        </ListItem>
      ))}
      {/* Captain Portal in mobile drawer */}
      <ListItem
        component={RouterLink}
        to="/captain"
        onClick={handleDrawerToggle}
        sx={{
          backgroundColor: isActiveRoute('/captain') ? 'rgba(255,42,42,0.15)' : 'transparent',
          '&:hover': { backgroundColor: 'rgba(255,42,42,0.1)' }
        }}
      >
        <ListItemText
          primary="Captain Portal"
          sx={{
            '& .MuiTypography-root': {
              color: '#ff2a2a',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700
            }
          }}
        />
      </ListItem>
    </List>
  );

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
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: '#ffffff',
              fontWeight: 'bold',
              padding: '8px 16px',
              borderRadius: '30px',
              fontFamily: "'Poppins', sans-serif",
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 42, 42, 0.15)',
                color: '#ff2a2a',
                boxShadow: '0 0 15px rgba(255, 42, 42, 0.3)'
              }
            }}
          >
            IBL 5.0
          </Typography>
        </Box>

        {/* Mobile Menu Icon */}
        {isMobile ? (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'rgba(255, 42, 42, 0.15)',
                color: '#ff2a2a'
              }
            }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          /* Desktop Navigation */
          <>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: { sm: 1, md: 2, lg: 3 },
              flex: '2',
            }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  component={RouterLink}
                  to={`/${item}`}
                  sx={{
                    color: isActiveRoute(`/${item}`) ? '#ff2a2a' : '#ffffff',
                    borderBottom: isActiveRoute(`/${item}`) ? '2px solid #ff2a2a' : 'none',
                    borderRadius: '4px',
                    padding: '8px 16px',
                    fontSize: { sm: '0.85rem', md: '0.9rem', lg: '1rem' },
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 42, 42, 0.1)',
                      color: '#ff2a2a',
                      borderBottom: '2px solid #ff2a2a'
                    }
                  }}
                >
                  {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Button>
              ))}
            </Box>
            {/* Captain Portal button */}
            <Button
              component={RouterLink}
              to="/captain"
              sx={{
                color: '#ff2a2a',
                border: isActiveRoute('/captain') ? '1px solid #ff2a2a' : '1px solid rgba(255,42,42,0.5)',
                borderRadius: '20px',
                padding: '6px 18px',
                fontSize: { sm: '0.8rem', md: '0.85rem' },
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                whiteSpace: 'nowrap',
                ml: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,42,42,0.15)',
                  border: '1px solid #ff2a2a',
                  boxShadow: '0 0 12px rgba(255,42,42,0.3)'
                }
              }}
            >
              Captain Portal
            </Button>
          </>
        )}

        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
              backgroundColor: '#0a0a0a',
              borderLeft: '1px solid rgba(255, 42, 42, 0.2)',
              color: '#ffffff'
            },
          }}
        >
          {drawer}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;