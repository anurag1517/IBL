import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Chip
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Footer from './Footer';

const Archives = () => {
  const archiveData = [
    {
      Edition: 'IBL 3.0',
      winner: 'The Real Slim Shadys',
      runnerUp: '420 Hoopers',
      secondRunnerUp: 'Skull Scorchers',
      topScorer: 'Alex Horo (420 Hoopers)',
      points: '69'
    },
    {
      Edition: 'IBL 2.0',
      winner: 'The Real Slim Shadys',
      runnerUp: 'Skull Scorchers',
      secondRunnerUp: 'Beast Bulls',
      topScorer: 'R Nagasurya (Skull Scorchers)',
      points: '54'
    },
    {
      Edition: 'IBL 1.0',
      winner: 'Black Mambas',
      runnerUp: 'To be updated',
      secondRunnerUp: 'To be updated',
      topScorer: 'To be updated',
      points: 'To be updated'
    }
  ];

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{
          p: { xs: 2, sm: 3, md: 4 },
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
        }}>
          <Typography 
            variant="h3" 
            sx={{ 
              mb: 4, 
              color: '#1a1a1a', 
              textAlign: 'center',
              fontWeight: 700,
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            IBL Hall of Fame
          </Typography>

          <TableContainer 
            component={Paper} 
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.04)' }}>
                  <TableCell 
                    sx={{ 
                      fontWeight: 700, 
                      fontSize: '1.1rem',
                      fontFamily: "'Montserrat', sans-serif",
                      py: 2
                    }}
                  >
                    Edition
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 700, 
                      fontSize: '1.1rem',
                      fontFamily: "'Montserrat', sans-serif"
                    }}
                  >
                    Champions
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 700, 
                      fontSize: '1.1rem',
                      fontFamily: "'Montserrat', sans-serif"
                    }}
                  >
                    Runners Up
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 700, 
                      fontSize: '1.1rem',
                      fontFamily: "'Montserrat', sans-serif"
                    }}
                  >
                    2nd Runners Up
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 700, 
                      fontSize: '1.1rem',
                      fontFamily: "'Montserrat', sans-serif"
                    }}
                  >
                    Top Scorer
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {archiveData.map((row) => (
                  <TableRow 
                    key={row.Edition}
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: 'rgba(0,0,0,0.02)',
                        transition: 'background-color 0.3s ease'
                      }
                    }}
                  >
                    <TableCell>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600,
                          fontFamily: "'Poppins', sans-serif",
                          color: '#1a1a1a'
                        }}
                      >
                        {row.Edition}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={<EmojiEventsIcon sx={{ color: '#FFD700' }} />}
                        label={row.winner}
                        sx={{
                          backgroundColor: 'rgba(255, 215, 0, 0.1)',
                          borderColor: '#FFD700',
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          '& .MuiChip-label': {
                            color: '#1a1a1a'
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ color: '#666' }}>{row.runnerUp}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ color: '#666' }}>{row.secondRunnerUp}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography sx={{ color: '#1a1a1a', fontWeight: 500 }}>
                          {row.topScorer}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#666' }}>
                          {row.points} points
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Archives;