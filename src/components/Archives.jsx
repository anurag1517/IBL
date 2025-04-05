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
  Chip,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Footer from './Footer';

const Archives = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

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

  // Mobile/Tablet Card View
  const MobileView = () => (
    <Grid 
      container 
      spacing={2}
      sx={{
        mx: 'auto', // Center the grid
        width: 'calc(100% - 32px)', // Account for padding
        px: 2 // Add horizontal padding
      }}
    >
      {archiveData.map((data) => (
        <Grid 
          item 
          xs={12} 
          sm={12} 
          key={data.Edition}
          sx={{
            '& .MuiCard-root': {
              mx: 'auto', // Center the card
              maxWidth: { xs: '100%', sm: '90%' } // Limit width on tablet
            }
          }}
        >
          <Card 
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              borderRadius: 2,
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.3s ease'
              }
            }}
          >
            <CardContent>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  color: '#1a1a1a',
                  mb: 2
                }}
              >
                {data.Edition}
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: '#666', mb: 1 }}>
                  Champions
                </Typography>
                <Chip
                  icon={<EmojiEventsIcon sx={{ color: '#FFD700' }} />}
                  label={data.winner}
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
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: '#666', mb: 0.5 }}>
                  Runners Up
                </Typography>
                <Typography sx={{ color: '#1a1a1a' }}>
                  {data.runnerUp}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: '#666', mb: 0.5 }}>
                  2nd Runners Up
                </Typography>
                <Typography sx={{ color: '#1a1a1a' }}>
                  {data.secondRunnerUp}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ color: '#666', mb: 0.5 }}>
                  Top Scorer
                </Typography>
                <Typography sx={{ color: '#1a1a1a', fontWeight: 500 }}>
                  {data.topScorer}
                </Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  {data.points} points
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  // Desktop Table View
  const DesktopView = () => (
    <TableContainer 
      component={Paper} 
      sx={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        borderRadius: 2,
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          height: '8px'
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1'
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '4px'
        }
      }}
    >
      <Table sx={{ minWidth: { xs: 650, sm: 750, md: 900 } }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.04)' }}>
            <TableCell 
              sx={{ 
                fontWeight: 700, 
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                fontFamily: "'Montserrat', sans-serif",
                py: { xs: 1.5, sm: 2 },
                whiteSpace: 'nowrap',
                minWidth: '100px'
              }}
            >
              Edition
            </TableCell>
            <TableCell sx={{ 
              fontWeight: 700, 
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              fontFamily: "'Montserrat', sans-serif",
              minWidth: '150px'
            }}>
              Champions
            </TableCell>
            <TableCell sx={{ 
              fontWeight: 700, 
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              fontFamily: "'Montserrat', sans-serif",
              minWidth: '130px'
            }}>
              Runners Up
            </TableCell>
            <TableCell sx={{ 
              fontWeight: 700, 
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              fontFamily: "'Montserrat', sans-serif",
              minWidth: '130px'
            }}>
              2nd Runners Up
            </TableCell>
            <TableCell sx={{ 
              fontWeight: 700, 
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              fontFamily: "'Montserrat', sans-serif",
              minWidth: '180px'
            }}>
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
              <TableCell sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    fontFamily: "'Poppins', sans-serif",
                    color: '#1a1a1a',
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
                  }}
                >
                  {row.Edition}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  icon={<EmojiEventsIcon sx={{ color: '#FFD700', width: { xs: 16, sm: 20 } }} />}
                  label={row.winner}
                  sx={{
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    borderColor: '#FFD700',
                    fontWeight: 600,
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    height: { xs: '24px', sm: '32px' },
                    '& .MuiChip-label': {
                      color: '#1a1a1a',
                      px: { xs: 1, sm: 2 }
                    }
                  }}
                />
              </TableCell>
              <TableCell sx={{ 
                color: '#666',
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}>
                {row.runnerUp}
              </TableCell>
              <TableCell sx={{ 
                color: '#666',
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}>
                {row.secondRunnerUp}
              </TableCell>
              <TableCell>
                <Box>
                  <Typography sx={{ 
                    color: '#1a1a1a', 
                    fontWeight: 500,
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}>
                    {row.topScorer}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#666',
                      fontSize: { xs: '0.8rem', sm: '0.9rem' }
                    }}
                  >
                    {row.points} points
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <>
      <Container 
        maxWidth="lg" 
        sx={{ 
          mt: { xs: 2, sm: 3, md: 4 },
          mb: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1, sm: 2 } // Add consistent horizontal padding
        }}
      >
        <Box sx={{
          p: { xs: 1, sm: 2, md: 4 },
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          overflowX: 'auto' // Enable horizontal scroll on small screens
        }}>
          <Typography 
            variant="h3" 
            sx={{ 
              mb: { xs: 2, sm: 3, md: 4 }, 
              color: '#1a1a1a', 
              textAlign: 'center',
              fontWeight: 700,
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
            }}
          >
            IBL Hall of Fame
          </Typography>

          {isMobile || isTablet ? <MobileView /> : <DesktopView />}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Archives;