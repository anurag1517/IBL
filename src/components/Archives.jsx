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

const Archives = ({ archives = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Sort by Edition to ensure newest first
  const sortedArchives = [...archives].sort((a, b) => {
    return b.Edition.localeCompare(a.Edition, undefined, { numeric: true, sensitivity: 'base' });
  });

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
      {sortedArchives.map((data) => (
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
              backgroundColor: '#0a0a0a',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255, 42, 42, 0.15)',
              borderRadius: '20px',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 25px rgba(255, 42, 42, 0.3)',
                border: '1px solid rgba(255, 42, 42, 0.5)'
              }
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontFamily: "'Poppins', sans-serif",
                  color: '#ff2a2a',
                  mb: 2,
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(255, 42, 42, 0.2)',
                  pb: 1
                }}
              >
                {data.Edition}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: '#aaaaaa', mb: 1 }}>
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
                    border: '1px solid',
                    '& .MuiChip-label': {
                      color: '#ffffff'
                    }
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: '#aaaaaa', mb: 0.5 }}>
                  Runners Up
                </Typography>
                <Typography sx={{ color: '#ffffff' }}>
                  {data.runnerUp}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: '#aaaaaa', mb: 0.5 }}>
                  2nd Runners Up
                </Typography>
                <Typography sx={{ color: '#ffffff' }}>
                  {data.secondRunnerUp}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ color: '#aaaaaa', mb: 0.5 }}>
                  Top Scorer
                </Typography>
                <Typography sx={{ color: '#ffffff', fontWeight: 600 }}>
                  {data.topScorer}
                </Typography>
                <Typography variant="caption" sx={{ color: '#ff2a2a', fontWeight: 'bold' }}>
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
        backgroundColor: '#0a0a0a',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255, 42, 42, 0.15)',
        borderRadius: '20px',
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
          <TableRow sx={{
            backgroundColor: 'rgba(255, 42, 42, 0.15)',
            '& th': { color: '#ffffff', borderBottom: '2px solid #ff2a2a' }
          }}>
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
          {sortedArchives.map((row) => (
            <TableRow
              key={row.Edition}
              sx={{
                transition: 'all 0.3s ease',
                '& td': { borderBottom: '1px solid rgba(255, 255, 255, 0.1)' },
                '&:hover': {
                  backgroundColor: 'rgba(255, 42, 42, 0.1)',
                  boxShadow: 'inset 0 0 15px rgba(255, 42, 42, 0.2)'
                }
              }}
            >
              <TableCell sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontFamily: "'Poppins', sans-serif",
                    color: '#ffffff',
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
                    border: '1px solid',
                    '& .MuiChip-label': {
                      color: '#ffffff',
                      px: { xs: 1, sm: 2 }
                    }
                  }}
                />
              </TableCell>
              <TableCell sx={{
                color: '#aaaaaa',
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}>
                {row.runnerUp}
              </TableCell>
              <TableCell sx={{
                color: '#aaaaaa',
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}>
                {row.secondRunnerUp}
              </TableCell>
              <TableCell>
                <Box>
                  <Typography sx={{
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}>
                    {row.topScorer}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#ff2a2a',
                      fontWeight: 'bold',
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
          backgroundColor: '#000000',
          borderRadius: '30px',
          border: '1px solid rgba(255, 42, 42, 0.2)',
          overflowX: 'auto'
        }}>
          <Typography
            variant="h3"
            sx={{
              mb: { xs: 3, sm: 4, md: 5 },
              color: '#ffffff',
              textAlign: 'center',
              fontWeight: 800,
              fontFamily: "'Poppins', sans-serif",
            fontSize: { xs: '1.8rem', sm: '2rem', md: '2.5rem' },
            letterSpacing: '2px'
            }}
          >
            IBL <span style={{ color: '#ff2a2a' }}>Hall of Fame</span>
          </Typography>

          {isMobile || isTablet ? <MobileView /> : <DesktopView />}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Archives;