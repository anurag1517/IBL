import React from 'react';
import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import Footer from './Footer';

const Stats = () => {
  const topPlayers = [
    {
      rank: 1,
      name: "Player 1",
      team: "Team A",
      score: 0
    },
    {
      rank: 2,
      name: "Player 2",
      team: "Team B",
      score: 0
    },
    {
      rank: 3,
      name: "Player 3",
      team: "Team C",
      score: 0
    }
  ];

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
            variant="h4" 
            sx={{ 
              mb: 4, 
              color: 'black', 
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            Top Scorers
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {topPlayers.map((player) => (
              <Grid item xs={12} sm={6} md={4} key={player.rank}>
                <Paper 
                  elevation={3}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 2,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)'
                    }
                  }}
                >
                  <Typography 
                    variant="h2" 
                    sx={{ 
                      color: 'black',
                      mb: 2,
                      fontWeight: 'bold'
                    }}
                  >
                    {player.rank}
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: 'black',
                      mb: 1,
                      fontWeight: 'bold'
                    }}
                  >
                    {player.name}
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: 'black',
                      mb: 2
                    }}
                  >
                    {player.team}
                  </Typography>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      color: 'black',
                      fontWeight: 'bold'
                    }}
                  >
                    {player.score}
                    <Typography 
                      component="span" 
                      variant="h6" 
                      sx={{ 
                        color: 'black',
                        ml: 1
                      }}
                    >
                      pts
                    </Typography>
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Stats;