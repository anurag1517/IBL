import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import TimelineIcon from '@mui/icons-material/Timeline';
import Footer from '../components/Footer';

const Home = () => {
  const navigate = useNavigate();

  const quotes = [
    {
      text: "Everything negative – pressure, challenges – is all an opportunity for me to rise.",
      author: "Kobe Bryant"
    },
    {
      text: "I've failed over and over and over again in my life. And that is why I succeed.",
      author: "Michael Jordan"
    },
    {
      text: "Hard work beats talent when talent fails to work hard.",
      author: "Kevin Durant"
    },
    {
      text: "You miss 100% of the shots you don't take.",
      author: "Michael Scott"
    },
    {
      text: "The strength of the team is each individual member. The strength of each member is the team.",
      author: "Phil Jackson"
    }
  ];

  // We duplicate the quotes array to create a seamless infinite scroll effect
  const cascadingQuotes = [...quotes, ...quotes];

  const marqueeAnimation = `
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `;

  const pulseAnimation = `
    @keyframes subtlePulse {
      0% { box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
      50% { box-shadow: 0 12px 24px rgba(0,0,0,0.15); }
      100% { box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    }
  `;

  const gradientBreathing = `
    @keyframes gradientPulse {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        overflowX: 'hidden',
        bgcolor: '#000000', // True Black background
        color: '#ffffff', // Stark white base text
      }}
    >
      <style>
        {marqueeAnimation}
        {pulseAnimation}
        {gradientBreathing}
      </style>
      <Container
        maxWidth={false}
        sx={{
          mt: { xs: 4, sm: 6, md: 8 },
          mb: { xs: 4, sm: 6, md: 8 },
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
        <Grid container spacing={4}>
          {/* Welcome Section */}
          <Grid item xs={12}>
            <Box
              sx={{
                textAlign: 'center',
                mb: { xs: 4, sm: 6, md: 8 },
                p: { xs: 3, sm: 4, md: 5 },
                background: 'transparent',
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  mb: 2,
                  background: 'linear-gradient(270deg, #000000, #555555, #000000)',
                  backgroundSize: '200% 200%',
                  animation: 'gradientPulse 5s ease infinite',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Welcome to IBL 5.0
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: '#333',
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                Experience the thrill of basketball at IIEST premier league
              </Typography>

              <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/fixtures')}
                  sx={{
                    backgroundColor: '#ff2a2a',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    borderRadius: '30px',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#cc0000',
                      transform: 'scale(1.05)',
                      boxShadow: '0 0 20px rgba(255, 42, 42, 0.6)'
                    },
                    transition: 'all 0.3s'
                  }}
                >
                  View Fixtures
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/points-table')}
                  sx={{
                    borderColor: '#ff2a2a',
                    color: '#ff2a2a',
                    px: 4,
                    py: 1.5,
                    borderRadius: '30px',
                    fontWeight: 'bold',
                    borderWidth: '2px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 42, 42, 0.1)',
                      borderWidth: '2px',
                      transform: 'scale(1.05)',
                      boxShadow: '0 0 15px rgba(255, 42, 42, 0.3)'
                    },
                    transition: 'all 0.3s'
                  }}
                >
                  Standings
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Quick Navigation Hub */}
          <Grid item xs={12}>
            <Grid container spacing={3} sx={{ mb: { xs: 4, sm: 6 } }}>
              {[
                { title: 'Teams', icon: <GroupsIcon fontSize="large" />, path: '/teams', desc: 'Meet the squads' },
                { title: 'Stats', icon: <TimelineIcon fontSize="large" />, path: '/stats', desc: 'Top performers' },
                { title: 'Gallery', icon: <PhotoLibraryIcon fontSize="large" />, path: '/gallery', desc: 'Action shots' },
                { title: 'Archives', icon: <EmojiEventsIcon fontSize="large" />, path: '/archives', desc: 'Hall of Fame' }
              ].map((item, idx) => (
                <Grid item xs={12} sm={6} md={3} key={idx}>
                  <Card
                    onClick={() => navigate(item.path)}
                    sx={{
                      cursor: 'pointer',
                      height: '100%',
                      background: 'rgba(25, 25, 25, 0.9)',
                      border: '1px solid rgba(255, 42, 42, 0.2)',
                      borderRadius: '30px',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 0 25px rgba(255, 42, 42, 0.4)',
                        border: '1px solid rgba(255, 42, 42, 0.8)',
                        background: 'linear-gradient(135deg, rgba(40,40,40,0.9) 0%, rgba(20,20,20,0.9) 100%)',
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ color: '#ff2a2a', mb: 2 }}>{item.icon}</Box>
                      <Typography variant="h6" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, mb: 1, color: '#ffffff' }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#aaaaaa', fontFamily: "'Montserrat', sans-serif" }}>
                        {item.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
          </Grid>

          {/* Quotes Section (Cascading Marquee) */}
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h4" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: '#ff2a2a' }}>

              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#aaaaaa', fontFamily: "'Montserrat', sans-serif", mt: 1 }}>

              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                position: 'relative',
                width: '100vw',
                left: '50%',
                right: '50%',
                marginLeft: '-50vw',
                marginRight: '-50vw',
                py: 2,
                '&:hover .marquee-content': {
                  animationPlayState: 'paused'
                }
              }}
            >
              <Box
                className="marquee-content"
                sx={{
                  display: 'flex',
                  gap: 3,
                  animation: 'marquee 30s linear infinite',
                  pl: 3
                }}
              >
                {cascadingQuotes.map((quote, index) => (
                  <Card
                    key={index}
                    sx={{
                      width: { xs: '300px', sm: '400px', md: '500px' },
                      flexShrink: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'rgba(20, 20, 20, 1)',
                      border: '1px solid rgba(255, 42, 42, 0.15)',
                      borderRadius: '30px',
                      whiteSpace: 'normal',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 0 30px rgba(255, 42, 42, 0.5)',
                        border: '1px solid rgba(255, 42, 42, 0.8)',
                        zIndex: 10
                      }
                    }}
                  >
                    <CardContent sx={{
                      p: { xs: 2.5, sm: 4 },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                      gap: 2
                    }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.4rem' },
                          fontStyle: 'italic',
                          color: '#ffffff',
                          lineHeight: 1.5,
                          fontWeight: 400
                        }}
                      >
                        "{quote.text}"
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 600,
                          textAlign: 'right',
                          color: '#ff2a2a',
                          fontSize: { xs: '0.9rem', sm: '1rem' }
                        }}
                      >
                        — {quote.author}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Upcoming Events Section Banner */}
          <Grid item xs={12}>
            <Card
              sx={{
                mt: { xs: 4, sm: 6 },
                background: 'linear-gradient(45deg, #1a0000, #400000)',
                border: '1px solid rgba(255, 42, 42, 0.3)',
                borderRadius: '30px',
                animation: 'subtlePulse 4s ease-in-out infinite',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  animationPlayState: 'paused',
                  boxShadow: '0 0 40px rgba(255, 42, 42, 0.5)'
                }
              }}
            >
              <CardContent sx={{ p: { xs: 4, sm: 6 } }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 800,
                    mb: 3,
                    color: '#ffffff',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}
                >
                  Upcoming Events
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: { xs: '1.1rem', sm: '1.2rem' },
                    lineHeight: 1.8,
                    color: '#e0e0e0',
                    textAlign: 'center',
                    maxWidth: '800px',
                    mx: 'auto'
                  }}
                >
                  Stay tuned for exciting basketball matches and championship updates.
                  Follow the journey of your favorite teams as they compete for glory.
                </Typography>

                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/fixtures')}
                    sx={{
                      backgroundColor: '#ff2a2a',
                      color: 'white',
                      borderRadius: '30px',
                      px: 5,
                      py: 1.5,
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#cc0000',
                        boxShadow: '0 0 15px rgba(255, 42, 42, 0.6)'
                      }
                    }}
                  >
                    See Schedule
                  </Button>
                </Box>
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