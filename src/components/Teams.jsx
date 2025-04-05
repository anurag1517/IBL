import React from 'react';
import Footer from './Footer';
import { Box, Typography, Paper, Grid, Container } from '@mui/material';

const Teams = () => {
  const poolATeams = [
    "Dark Knights",
    "Hellfire Clan",
    "Akatsuki",
    "The Real Slim Shady's",
  ];

  const poolBTeams = [
    "Skull Scorchers",
    "Beast Bulls",
    "Small Bois Squad",
    "420 Ballers",
  ];

  return (
    <><Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box
              sx={{
                  p: 4,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                  mx: 'auto',
                  maxWidth: '1000px'
              }}
          >
              <Typography
                  variant="h4"
                  sx={{
                      mb: 4,
                      color: 'black',
                      textAlign: 'center',
                      fontWeight: 'bold'
                  }}
              >
                  Teams
              </Typography>

              <Grid container spacing={6} justifyContent="center">
                  {/* Pool A */}
                  <Grid item xs={12} md={6}>
                      <Paper
                          elevation={3}
                          sx={{
                              p: 3,
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              borderRadius: 2
                          }}
                      >
                          <Typography
                              variant="h5"
                              sx={{
                                  mb: 3,
                                  color: 'black',
                                  textAlign: 'center',
                                  fontWeight: 'bold',
                                  borderBottom: '2px solid black',
                                  pb: 1
                              }}
                          >
                              Pool A
                          </Typography>
                          {poolATeams.map((team, index) => (
                              <Box
                                  key={index}
                                  sx={{
                                      p: 2,
                                      mb: 1,
                                      color: 'black',
                                      textAlign: 'center',
                                      borderRadius: 1,
                                      transition: 'all 0.3s ease',
                                      '&:hover': {
                                          backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                          transform: 'scale(1.02)'
                                      }
                                  }}
                              >
                                  {team}
                              </Box>
                          ))}
                      </Paper>
                  </Grid>

                  {/* Pool B */}
                  <Grid item xs={12} md={6}>
                      <Paper
                          elevation={3}
                          sx={{
                              p: 3,
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              borderRadius: 2
                          }}
                      >
                          <Typography
                              variant="h5"
                              sx={{
                                  mb: 3,
                                  color: 'black',
                                  textAlign: 'center',
                                  fontWeight: 'bold',
                                  borderBottom: '2px solid black',
                                  pb: 1
                              }}
                          >
                              Pool B
                          </Typography>
                          {poolBTeams.map((team, index) => (
                              <Box
                                  key={index}
                                  sx={{
                                      p: 2,
                                      mb: 1,
                                      color: 'black',
                                      textAlign: 'center',
                                      borderRadius: 1,
                                      transition: 'all 0.3s ease',
                                      '&:hover': {
                                          backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                          transform: 'scale(1.02)'
                                      }
                                  }}
                              >
                                  {team}
                              </Box>
                          ))}
                      </Paper>
                  </Grid>
              </Grid>
          </Box>
      </Container>
      <Footer /></>
  );
};

export default Teams;