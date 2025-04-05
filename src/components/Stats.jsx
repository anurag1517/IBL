import React from 'react';
import { Box, Container, Typography, Paper, Stack } from '@mui/material';
import Footer from './Footer';

const Stats = () => {
  const topPlayers = [
    {
      rank: 1,
      name: "R Nagasurya",
      team: "Skull Scorchers",
      score: 39
    },
    {
      rank: 2,
      name: "Vishnu",
      team: "The Real Slim Shady's",
      score: 37
    },
    {
      rank: 3,
      name: "Pranjal E.Subba",
      team: "Small Bois Squad",
      score: 29
    },
    {
      rank: 4,
      name: "Anurag Kumar",
      team: "The Real Slim Shady's",
      score: 24
    },
    {
      rank: 5,
      name: "M. Jayant Kumar",
      team: "Beast Bulls",
      score: 18
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
              fontWeight: 'bold',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Top Scorers
          </Typography>

          <Box
            sx={{
              overflowX: 'auto',
              '&::-webkit-scrollbar': {
                height: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '4px'
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: '4px',
                '&:hover': {
                  background: '#666'
                }
              }
            }}
          >
            <Stack 
              direction="row" 
              spacing={3}
              sx={{ 
                pb: 2,
                minWidth: 'min-content'
              }}
            >
              {topPlayers.map((player) => (
                <Paper 
                  key={player.rank}
                  elevation={3}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 2,
                    minWidth: { xs: '240px', sm: '280px' },
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                    },
                    border: player.rank === 1 ? '2px solid #FFD700' : 
                           player.rank === 2 ? '2px solid #C0C0C0' :
                           player.rank === 3 ? '2px solid #CD7F32' : 'none'
                  }}
                >
                  <Typography 
                    variant="h2" 
                    sx={{ 
                      color: player.rank === 1 ? '#FFD700' : 
                             player.rank === 2 ? '#C0C0C0' :
                             player.rank === 3 ? '#CD7F32' : 'black',
                      mb: 2,
                      fontWeight: 'bold',
                      fontSize: { xs: '2.5rem', sm: '3rem' }
                    }}
                  >
                    {player.rank}
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: 'black',
                      mb: 1,
                      fontWeight: 'bold',
                      fontSize: { xs: '1.2rem', sm: '1.5rem' }
                    }}
                  >
                    {player.name}
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: 'black',
                      mb: 2,
                      fontSize: { xs: '0.9rem', sm: '1rem' }
                    }}
                  >
                    {player.team}
                  </Typography>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: { xs: '1.8rem', sm: '2rem' }
                    }}
                  >
                    {player.score}
                    <Typography 
                      component="span" 
                      variant="h6" 
                      sx={{ 
                        color: 'black',
                        ml: 1,
                        fontSize: { xs: '1rem', sm: '1.2rem' }
                      }}
                    >
                      pts
                    </Typography>
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Stats;