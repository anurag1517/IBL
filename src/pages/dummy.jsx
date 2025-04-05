import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, useTheme, useMediaQuery } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1
      }}
    >
      {/* <Navbar /> */}
      
      <Container 
        maxWidth={false}
        sx={{ 
          mt: { xs: 2, sm: 3, md: 4 },
          mb: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 3, md: 4 },
          width: {
            xs: '95%',
            sm: '90%',
            md: '85%',
            lg: '80%'
          },
          maxWidth: '1400px !important',
          mx: 'auto'
        }}
      >
        <Grid 
          container 
          spacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{ width: '100%', margin: '0 auto' }}
        >
          <Grid item xs={12}>
            <Typography 
              variant={isSmallScreen ? 'h5' : 'h4'} 
              component="h2" 
              gutterBottom
              sx={{
                textAlign: { xs: 'center', sm: 'left' },
                fontSize: {
                  xs: '1.5rem',
                  sm: '2rem',
                  md: '2.5rem'
                }
              }}
            >
              Welcome to IBL 4.0
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card 
              sx={{ 
                height: '100%',
                minHeight: { xs: '200px', sm: '250px' },
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                <Typography 
                  variant={isSmallScreen ? 'subtitle1' : 'h6'} 
                  gutterBottom
                  sx={{ mb: 2 }}
                >
                  Latest Updates
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{
                    fontSize: {
                      xs: '0.9rem',
                      sm: '1rem',
                      md: '1.1rem'
                    }
                  }}
                >
                  Stay tuned for the latest matches, scores, and player statistics.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card 
              sx={{ 
                height: '100%',
                minHeight: { xs: '200px', sm: '250px' },
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                <Typography 
                  variant={isSmallScreen ? 'subtitle1' : 'h6'} 
                  gutterBottom
                  sx={{ mb: 2 }}
                >
                  Upcoming Matches
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{
                    fontSize: {
                      xs: '0.9rem',
                      sm: '1rem',
                      md: '1.1rem'
                    }
                  }}
                >
                  Check out the schedule for upcoming basketball matches.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default Home;