import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import Footer from '../components/Footer';

const Home = () => {
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
      author: "Wayne Gretzky / Michael Scott"
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
        overflowX: 'hidden'
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
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 4,
                backdropFilter: 'blur(10px)',
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
            </Box>
          </Grid>

          {/* Quotes Section (Cascading Marquee) */}
          <Grid item xs={12}>
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
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 4,
                      whiteSpace: 'normal',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                        zIndex: 10
                      }
                    }}
                  >
                    <CardContent sx={{
                      p: { xs: 2.5, sm: 3 },
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
                          color: '#1a1a1a',
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
                          color: '#4a4a4a',
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

          {/* Upcoming Events Section */}
          <Grid item xs={12}>
            <Card
              sx={{
                mt: { xs: 4, sm: 6 },
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: 4,
                animation: 'subtlePulse 4s ease-in-out infinite',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  animationPlayState: 'paused',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                }
              }}
            >
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    mb: 3,
                    color: '#1a1a1a',
                    textAlign: 'center'
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
                    color: '#4a4a4a',
                    textAlign: 'center',
                    maxWidth: '800px',
                    mx: 'auto'
                  }}
                >
                  Stay tuned for exciting basketball matches and championship updates.
                  Follow the journey of your favorite teams as they compete for glory.
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